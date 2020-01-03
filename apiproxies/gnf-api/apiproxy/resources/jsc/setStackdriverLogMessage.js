var gnf_ReqHeaders = JSON.parse( JSON.stringify(context.proxyRequest.headers) ) ;

//removing Authorization Header
if(gnf_ReqHeaders.hasOwnProperty("Authorization")){
    
    delete gnf_ReqHeaders["Authorization"];
}
if(gnf_ReqHeaders.hasOwnProperty("authorization")){
    
    delete gnf_ReqHeaders["authorization"]; 
}
//removing Apikey Header
if(gnf_ReqHeaders.hasOwnProperty("Apikey")){
    
    delete gnf_ReqHeaders["Apikey"];
}
if(gnf_ReqHeaders.hasOwnProperty("apikey")){
    
    delete gnf_ReqHeaders["apikey"];
}
if(gnf_ReqHeaders.hasOwnProperty("APIKEY")){
    
    delete gnf_ReqHeaders["APIKEY"];
}
if(gnf_ReqHeaders.hasOwnProperty("client_id")){
    
    delete gnf_ReqHeaders["client_id"];
}
if(gnf_ReqHeaders.hasOwnProperty("client_secret")){
    
    delete gnf_ReqHeaders["client_secret"];
}

// set Apikey to log to Stackdriver
var requestApikey = context.getVariable("apigee.client_id");
var gnf_ReqApikey = "";
gnf_ReqApikey = redactField(requestApikey) ; 





context.setVariable("gnf_ReqApikey", gnf_ReqApikey);
// get all the Request headers and log it to Stackdriver 
context.setVariable("gnf_ReqHeaders", gnf_ReqHeaders);




//redacting logic
function redactField(sensitiveField){

	var first2 = "";
	var last4 = "";
	var remainingToMask = "";
	var redacted_field_first2_last4 = "";

	if(sensitiveField !== null && sensitiveField !== "" && sensitiveField !== undefined && sensitiveField.replace(/\s/g, '').length !== 0){

		first2 = sensitiveField.substring(0,2);
		last4  = sensitiveField.substring(sensitiveField.length - 4, sensitiveField.length);
		remainingToMask = sensitiveField.substring(2,sensitiveField.length-4) ;
		redacted_field_first2_last4 = first2 + Array(remainingToMask.length + 1).join("X") + last4 ;

		return redacted_field_first2_last4
	}
	else return "N/A"
	
}

/*
//redacting Apikey in headers
var apikeyIsPresent = gnf_ReqHeaders.hasOwnProperty("Apikey") || gnf_ReqHeaders.hasOwnProperty("apikey") || gnf_ReqHeaders.hasOwnProperty("APIKEY") ;
var apikeyValue = gnf_ReqHeaders["Apikey"] || gnf_ReqHeaders["apikey"] || gnf_ReqHeaders["APIKEY"] ; 

if( apikeyIsPresent ){

	// replace with redacted "Apikey" 
	gnf_ReqHeaders["Apikey"] = redactField(apikeyValue) ;
}*/