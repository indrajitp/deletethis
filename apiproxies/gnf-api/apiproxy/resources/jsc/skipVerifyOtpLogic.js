var reqUri = context.getVariable("proxy.pathsuffix");

if(reqUri.indexOf("/users/otp") > -1) 
{
   context.setVariable("skipOtpVerify", "true");
}