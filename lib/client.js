

module.exports = Client;

function Client(cloud) {

  this._cloud = cloud;
  this.readable = true;
  this.writeable = true;
  this.V = 0;
  this.D = 1007;
  this.G = "0";
  var self = this;
  process.nextTick(function() {
    self.emit('data','000000');
  });
  var Hue = require('hue.js');
  var hue = Hue.createClient({
    stationIp:'10.0.1.106',
    appName:cloud.config.id
  });
  hue.lights(function(){
    console.dir(arguments);
  })
  this._hue = hue;
};

Client.prototype.write = function(data) {
  var that = this;
  var color = new RGBColor(data);
  var vals = color.getDecimalVals();
  this._hue.lights(function(lights){
    Object.keys(lights).forEach(function(l) {
      that._hue.rgb(l,vals.red,vals.green,vals.blue);
    });
  })

  return true;
};
Client.prototype.end = function() {};
Client.prototype.close = function() {};

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