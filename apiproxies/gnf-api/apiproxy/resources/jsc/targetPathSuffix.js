context.setVariable("target.copy.pathsuffix", false);
var reqUri = context.getVariable("proxy.pathsuffix");

var prefix = reqUri.substring(0, 7);
 
context.setVariable("uri", prefix);

if(prefix == "/images") 
{
    context.setVariable("target.copy.pathsuffix", false);
    var backend = context.getVariable("target.url");
    context.setVariable("Bkend", backend);
    var path = context.getVariable("target.url") + "/gnf" + context.getVariable("proxy.pathsuffix");
    context.setVariable("target.url", path);
    print("path", path);
}

//setting uri for user-offboarding backend
/*var offboardingPrefix = reqUri.substring(0, 17);
if(offboardingPrefix == "/user/offboarding") 
{
    context.setVariable("target.copy.pathsuffix", false);*/
  /*var targetUri = "serviceName="+context.getVariable("serviceName")+"&hash="+context.getVariable("hashValue"); */
 /*var targetUri= context.getVariable("request.querystring")
  print("***"+targetUri);
  context.setVariable("uriPath", targetUri);
}*/
