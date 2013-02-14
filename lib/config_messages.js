exports.probeGreeting = {
  "contents":[
    { "type":"heading1",    "text":"Philips Hue"},
    { "type": "paragraph", "text": "We can scan your network automatically. To start, click Search."},
    { "type": "submit", "name": "Search", "rpc_method": "search" },
    { "type": "paragraph", "text": "If you cannot find your Hue, you can add the base station manually."},
    { "type": "submit", "name": "Add Manually", "rpc_method": "manual_get_ip" }
  ]
};

exports.fetchIpModal = {
  "contents":[
    { "type":"heading1",    "text":"Philips Hue (Manual)"},
    { "type": "paragraph", "text":"Please enter the IP address of the base station below. Once you have clicked add, press the link button on the Hue to continue."},
    { "type": "input_field_text", "field_name": "ip_address", "value": "", "label": "IP", "placeholder": "x.x.x.x", "required": true},
    { "type": "submit", "name": "Add", "rpc_method": "manual_set_ip" }
  ]
};

exports.gaveUpManualRegistration = {
  "contents":[
    { "type":"paragraph", "text":"Gave up manual registration"},
    { "type":"close", "text":"Finish"}
  ]
};

exports.gaveUpAutoRegistration = {
  "contents":[
    { "type":"paragraph", "text":"Gave up search"},
    { "type":"close", "text":"Finish"}
  ]
};

exports.finish = {
  "finish": true
};