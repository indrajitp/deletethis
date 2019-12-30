var error =context.getVariable("errorResponse");
var errorCheck = context.getVariable("response.content");
var httpcode;
var httpMessage;
var moreInfo;
var errorCodeBadReq;
var errorCodeBadToken;
var errorCodeBackend=500;
var checkError = false;

//check for bad request from k2view
if(errorCheck !==null && errorCheck.includes("400 BAD Request")){
    checkError = true;
    httpcode=400;
    errorCodeBadReq=400;
    moreInfo=error;
    httpMessage="Invalid Input Request";
    context.setVariable("httpcode",httpcode);
    context.setVariable("httpMessage",httpMessage);
    context.setVariable("flow.error.status", "400");
    context.setVariable("errortype","Bad Request");
	context.setVariable("errorCode",errorCodeBadReq);
	context.setVariable("moreInfo",moreInfo);
	context.setVariable("checkError",checkError);
}
//check for invalid token from k2view
if(errorCheck !==null && errorCheck.includes("WebServiceException: Token")){
    checkError = true;
    httpcode=401;
    errorCodeBadToken=401;
    httpMessage="Unauthorized";
    moreInfo=error;    
    context.setVariable("httpcode",httpcode);
    context.setVariable("httpMessage",httpMessage);
    context.setVariable("flow.error.status", "401");
    context.setVariable('errorCode',errorCodeBadToken);
    context.setVariable("errortype","Unauthorized");
	context.setVariable("moreInfo",moreInfo);    
    context.setVariable("checkError",checkError);
}
//check for any other k2view error
if(!errorCheck.includes("WebServiceException: Token") && !errorCheck.includes("400 BAD Request") && error !== null){
    checkError = true;
    httpcode=500;
    errorCodeBadToken=500;
    httpMessage="Internal Server Error";
    moreInfo=error;    
    context.setVariable("httpcode",httpcode);
    context.setVariable("httpMessage",httpMessage);
    context.setVariable("flow.error.status", "500");
    context.setVariable('errorCode',errorCodeBackend);
    context.setVariable("errortype","Internal Server Error");
	context.setVariable("moreInfo",moreInfo);    
    context.setVariable("checkError",checkError);
}