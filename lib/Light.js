var stream = require('stream');
var util = require('util');
var Helpers = require('./helpers');

util.inherits(Light,stream);
module.exports = Light;

/**
 * Creates a new Light Object
 * @param {Object} hue  The Hue Client
 * @param {Number} station The station index
 * @param {Number} light   The light index within that station
 */
function Light(hue,station,light) {

  this.readable = true;
  this.writeable = true;
  this.V = 0;
  this.D = 1008;

  // We start the G with the staion ID so we can support
  // multiple stations
  this.G = station+light;

  this._hue = hue;
  this._station = station;
  this._light = light;

  var self = this;

  // Light actuated, fetch it current state and emit that.
  this._hue.light(this._light,function(err,data) {

    if (err) {
      // TODO handle this
      return;
    }

    // Emit the state as a string.
    this.emit('data',JSON.stringify(data.state));

  }.bind(this));
};

Light.prototype.write = function(data) {

  try {
    var state = JSON.parse(data);
  } catch (err) {
    return;
  }

  // Set the state, Hue is lucky because the Light protocol
  // is based off of its API, so we can call it 1-1.
  this._hue.state(this._light,state,function(err) {

    // Light actuated, fetch it current state and emit that.
    this._hue.light(this._light,function(err,data) {

      if (err) {
        // TODO handle this
        return;
      }

      // Emit the state as a string.
      this.emit('data',JSON.stringify(data.state));

    }.bind(this));

  }.bind(this));
  return true;
};

Light.prototype.end = function() {};
Light.prototype.close = function() {};