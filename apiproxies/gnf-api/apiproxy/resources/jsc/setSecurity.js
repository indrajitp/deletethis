/* Enabling the Oauth security for the incoming requests basing on the uri */ 
var reqUri = context.getVariable("proxy.pathsuffix");
var verb = context.getVariable("request.verb");
var enableSecurity = "false";

/* Enabling the required shared flow variables, oauth and source validation done in gnf proxy */

context.setVariable("_SF_Default-Security-Policies.sqlProtection","true");
context.setVariable("_SF_Default-Security-Policies.jsonValid","true");


if(reqUri != "/serviceproviders"){
    
    context.setVariable("_SF_Default-Security-Policies.jsonProtection","true");
}
if (((reqUri == "/notify") || (reqUri == "/notify/publisher") || (reqUri == "/status") || (reqUri == "/notification/cancel")  || (reqUri.startsWith("/applications"))|| (reqUri.startsWith("/groups"))  || (reqUri == "/roles/user**") || (reqUri == "/configurations**") || (reqUri == "/logs**") || (reqUri == "/serviceproviders") ) &&  (verb != "OPTIONS")){
    
    enableSecurity = "true";
    context.setVariable("enableSecurity",enableSecurity);
}
 
 //generating global transaction Id if it is not comming in the request
var gid = context.getVariable("gid");
if (gid !== "" && gid !== null && gid !== undefined && request.verb != "OPTIONS"){
    context.setVariable("request.header.x_global_transaction_id",context.getVariable("gid") );
}
else if(request.verb != "OPTIONS"){
    context.setVariable("request.header.x_global_transaction_id",context.getVariable("messageid") );
}

// extracting session_id if available in request header
var req_session_id = context.getVariable("request.header.session_id");
if( req_session_id !== null && req_session_id !== '' && req_session_id !== undefined )
    context.setVariable("req_session_id", req_session_id); 
