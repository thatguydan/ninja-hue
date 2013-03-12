var Hue = require('hue.js')
  , messages = require('./config_messages')

exports.probe = function(cb) {

  cb(null,messages.probeGreeting);
};

exports.manual_get_ip = function(params,cb) {

  cb(null,messages.fetchIpModal);
};

exports.search = function(params,cb) {

  var self = this;
  var toSend = {
    "contents":[
      { "type":"heading",    "text":"Philips Hue"},
    ]
  }

  Hue.discover(function(stations) {

    var newStations = [];

    stations.forEach(function(station) {

      if (self._opts.stations.indexOf(station)===-1) {
        // We don't have this station configured
        newStations.push({"type":"paragraph", "text": "We have found a base station at "+station+". Press the link button to enable this Philips Hue."});
      }

      if (newStations.length===0) {
        // No new stations
        newStations.push({"type":"paragraph", "text": "We have refreshed your Hue lights. Any new ones should appear on your dashboard."});
        newStations.push({"type":"close", "name": "Close"});
      }

      toSend.contents = toSend.contents.concat(newStations);
      cb(null,toSend);

      self.registerStation.call(self,station,function(err) {
        if (err) {
          cb(null,messages.gaveUpAutoRegistration);
        } else {
          cb(null,messages.finish);
        }
      });
    });
  });
};


exports.manual_set_ip = function(params,cb) {
  this.registerStation.call(this,params.ip_address,function(err) {
    if (err) {
      cb(null,messages.gaveUpManualRegistration);
    } else {
      cb(null,messages.finish);
    }
  });
  cb(null,messages.pressLinkButton);
};

exports.manual_show_remove = function(params,cb) {

  var toShow = messages.removeHueModal;

  var stations = this._opts.stations;

  var optionArr = [];

  for (var i=0;i<stations.length;i++) {
    optionArr.push({name:stations[i],value:stations[i]});
  }

  if (optionArr.length>0) {
    toShow.contents[2].options = optionArr;
  }

  cb(null,toShow);
};

exports.manual_remove_hue = function(params,cb) {
  console.log(params)
  if (!params.station) {

    return cb(null,messages.finish);
  }

  var client = Hue.createClient({
    stationIp:params.station,
    appName:this.appName
  });

  client.unregister(function(err) {
    if (err) cb(null,messages.removeHueError);
    else cb(null,messages.removeHueSuccess);
  });
};