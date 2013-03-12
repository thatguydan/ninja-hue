exports.probeGreeting = {
  "contents":[
    { "type":"heading",    "text":"Philips Hue"},
    { "type": "paragraph", "text": "We can scan your network automatically. To start, click Search."},
    { "type": "submit", "name": "Search", "rpc_method": "search" },
    { "type": "paragraph", "text": "If you cannot find your Hue, you can add the base station manually."},
    { "type": "submit", "name": "Add Manually", "rpc_method": "manual_get_ip" },
    { "type": "paragraph", "text": "Finally, you can also unpair your Hue base staion."},
    { "type": "submit", "name": "Remove Existing", "rpc_method": "manual_show_remove" }
  ]
};

exports.fetchIpModal = {
  "contents":[
    { "type":"heading",    "text":"Philips Hue (Manual)"},
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

exports.pressLinkButton = {
  "contents":[
    { "type":"heading", "text":"Registering"},
    { "type":"paragraph", "text":"Please press the Link Button on your Philips Hue base station."}
  ]
};

exports.removeHueModal = {
  "contents":[
    { "type":"heading"  ,    "text":"Philips Hue"},
    { "type":"paragraph",    "text":"Please choose the Hue base station you wish to unpair"},
    { "type": "input_field_select", "field_name": "station", "label": "Hue", "options": [{ "name": "None", "value": "", "selected": true}], "required": false },
    { "type":"submit"   ,    "name": "Unpair", "rpc_method": "manual_remove_hue" }
  ]
};

exports.removeHueError = {
  "contents": [
    { "type":"heading" ,  "text":"Philip Hue" },
    { "type":"paragraph",    "text":"There was an error unpairing that Hue base station"},
    { "type":"close", "text":"Close"}
  ]
}

exports.removeHueSuccess = {
  "contents": [
    { "type":"heading" ,  "text":"Philip Hue" },
    { "type":"paragraph",    "text":"Your Hue base station has been unpaired"},
    { "type":"paragraph",    "text":"Important: you will still need to manually delete the individual lights from your dashboard"},
    { "type":"close", "text":"Close"}
  ]
}

exports.finish = {
  "finish": true
};