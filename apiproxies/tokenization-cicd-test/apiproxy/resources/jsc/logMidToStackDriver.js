 //logging mid parameter to stackdriver
 var mid = context.getVariable('mid');
 context.setVariable('tokenization_mid',mid);
 
 //To reduce latency hardcoding below values
 var k2vToken = "ccToken";
 var mod10Check = false;
 var bypassCache = false;
 
 context.setVariable('k2vToken',k2vToken);
 context.setVariable('mod10Check',mod10Check);
 context.setVariable('bypassCache',bypassCache);