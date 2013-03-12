exports.hsl2rgb = function(h,s,v) {
  var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

exports.RGBColor = function(color) {
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

