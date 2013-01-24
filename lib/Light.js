var stream = require('stream');
var util = require('util');

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
  this.G = station+light;

  this._hue = hue;
  this._station = station;
  this._light = light;

  var self = this;

  process.nextTick(function() {
    console.log('emitting');
    self.emit('data','000000');
  });
};

Light.prototype.write = function(data) {

  var color = new RGBColor(data);
  var vals = color.getDecimalVals();
  this._hue.rgb(this._light,vals.red,vals.green,vals.blue);

  return true;
};
Light.prototype.end = function() {};
Light.prototype.close = function() {};

function RGBColor (color) {
  //Param is a hex string of color info
  //Common hex prefixes of '0x' and '#'
  //is accepted.

  //Properties
  this.color = color;

  //Methods
  this.getColor = function(){
    /*Return original color string*/

    return this.color;
  };

  this.getDecimalVals = function(){
    /*Returns an object with red, green, and blue
    properties in decimal value*/

    var color = this.color;

    var rgb;
    var colorObj;

    //Replace hex prefixes if present
    color = color.replace("0x", "");
    color = color.replace("#", "");

    //Easier to visualize bitshifts in hex
    rgb = parseInt(color, 16);

    //Extract rgb info
    colorObj = new Object();
    colorObj.red = (rgb & (255 << 16)) >> 16;
    colorObj.green = (rgb & (255 << 8)) >> 8;
    colorObj.blue = (rgb & 255);

    return colorObj;
  };
};