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
      { "type":"heading1",    "text":"Philips Hue"},
      { "type":"heading4",    "text":"Now Searching"},
    ]
  }

  Hue.discover(function(stations) {

    stations.forEach(function(station) {

      if (self._opts.stations.indexOf(station)===-1) {
        // We don't have this station configured
        toSend.contents.push({"type":"paragraph", "text": "We have found a base station at "+station+". Press the link button to enable this Philips Hue."});
      }

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