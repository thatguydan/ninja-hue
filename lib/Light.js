var stream = require('stream');
var util = require('util');
var Helpers = require('./Helpers');

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
  this.D = 1007;

  // We start the G with the staion ID so we can support
  // multiple stations
  this.G = station+light;

  this._hue = hue;
  this._station = station;
  this._light = light;

  var self = this;

  this._hue.light(
    this._light
    , function(err,data) {

      if (err) {
        return;
      }

      var hue = data.state.hue/65536;
      var sat = data.state.sat/255;
      var bri = data.state.bri/255;

      var RGB = Helpers.hsl2rgb(hue,sat,bri);
      var str = RGB.map(function(k) {
        var s = Math.round(k).toString(16);
        if (s.length===1) s = '0'+s;
        return s;
      }).join('');
      self.emit('data',str);
    }
  );
};

Light.prototype.write = function(data) {

  var self = this;
  var color = new Helpers.RGBColor(data);
  var vals = color.getDecimalVals();
  console.log(data);
  // If we want it black we will turn it off instead
  if (data === '000000') {
    this._hue.off(
      this._light
      , function(err) {
        if (err) {
          // Device is not present?
          return
        }

        self.emit('data',data);
      }
    );
  } else {
    // Turn the bulb on and set its RGB value
    this._hue.on(this._light).rgb(
      this._light
      , vals.red
      , vals.green
      , vals.blue
      , function(err) {
        if (err) {
          // Device is not present?
          return
        }

        self.emit('data',data);
      }
    );
  }

  return true;
};

Light.prototype.end = function() {};
Light.prototype.close = function() {};