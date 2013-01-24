var util = require('util')
  , stream = require('stream')
  , os = require('os')
  , helpers = require('./lib/helpers')
  , Hue = require('hue.js')
  , Light = require('./lib/Light');

util.inherits(hue,stream);
module.exports = hue;

function hue(opts,app) {

  var self = this;

  this.log = app.log;

  this._app = app;
  this._opts = this.opts = opts = {
    stations:[],
    autoRegister:true
  };

  // Todo: use node ID
  this.appName = 'Hue Ninja Module';

  app.on('client::up', function() {

    if (self._opts.stations.length>0) {
      loadStations.call(self);
    } else {
      findStations.call(self);
    }
  });
};

hue.prototype.config = function(config) {
  // Handle config, then
  // this.emit('config')
};

function findStations() {

  this._app.log.info('Hue has no configuration')
  var self = this;

  // If we do not want to auto register
  if (!this._opts.autoRegister) return;

  Hue.discover(function(stations) {

    stations.forEach(registerStation.bind(self));
  });
};

function registerStation(station) {

  if (this._opts.stations.indexOf(station)>-1) {
    // We already have this station registered.
    this._app.log.info('Already configured %s, aborting',station);
    return;
  }

  var self = this;

  var client = Hue.createClient({
    stationIp:station,
    appName:this.appName
  });

  var registerOpts = {
    interval:2000,
    attempts:0
  };

  client.register(registerOpts,function(err) {

    if (err) {
      // Do nothing?
      self._app.log.info('Timed out waiting for station')
      return;
    }

    self._app.log.info('Having Hue configuration');
    self._opts.stations.push(station);

    console.log(self._opts)
    self.save();

    loadStations.call(self);
  });
};

function loadStations() {

  this._opts.stations.forEach(fetchLights.bind(this));
};

function fetchLights(station,stationIndex) {

  var self = this;

  var client = Hue.createClient({
    stationIp:station,
    appName:this.appName
  });

  client.lights(function(err,lights) {

    if (err) {
      // TODO check we are registered
      self.app.log.error(err);
      return;
    }

    Object.keys(lights).forEach(function(lightIndex) {

      self.emit('register',new Light(client,stationIndex,lightIndex))
    });
  });
};
