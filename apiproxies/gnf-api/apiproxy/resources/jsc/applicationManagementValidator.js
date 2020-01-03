//GNF:Validations on Application management 
var applicationId = context.getVariable("aId");
var groupId = context.getVariable("gId");
var userId =  context.getVariable("uId");
var applicationName =  context.getVariable("appName");
var userEmail =  context.getVariable("userEmail");
var applicationStatus =  context.getVariable("appStatus");
/*var createdBy =  context.getVariable("createdBy");*/
var isDeleted =  context.getVariable("isDeleted");
/*var modifiedBy =  context.getVariable("modifiedBy");*/
var isAppPrefValidJson = true;
var errorHandling = [];
//checking applicationPreference has valid json 
try {
	var applicationPreference = JSON.parse(context.getVariable("appPref"));
}catch (e) {
   isAppPrefValidJson = false ;
	print("Error:"+e);
    var errorCode = "40009";
	var errorMessage = "applicationPreference contains unexpected data";
	context.setVariable("http.reasonPhrase", "BAD REQUEST");
	context.setVariable("http.statusCode", "400");
	context.setVariable("log.severity", "Error");       
	errorHandling.push({
		errorCode : errorCode,
		errorMessage : errorMessage
	});
}

//regex declarations
var mail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
var alpahbets = /^[a-zA-Z]*$/;
var numbers = /^[0-9]*$/;

var reEmail = new RegExp(mail);
var reAlphs = new RegExp(alpahbets);
var reNumbers = new RegExp(numbers);

//applying regex on input params
var re_appId = reNumbers.test(applicationId);
var re_groupId = reNumbers.test(groupId);
var re_userId = reNumbers.test(userId);
/*var re_createdBy = reNumbers.test(createdBy);
var re_modifiedBy = reNumbers.test(modifiedBy);*/
var re_isDeleted = reNumbers.test(isDeleted);
var re_appName = reAlphs.test(applicationName);
var re_userEmail = reEmail.test(userEmail);
var re_appStatus = reAlphs.test(applicationStatus);

//getting incomming verb and request uri
var verb = context.getVariable("request.verb");
var reqUri = context.getVariable("request.uri");

//mandatory check for User Email field
if(verb !== "POST" || verb !== "PUT")
{
	//mandatory field check for input variables
	if (userEmail === null || userEmail === "") {
	    if (!(re_userEmail)) {
			var errorCode = "40008";
			var errorMessage = "Request expects the following fields User Email";
			context.setVariable("http.reasonPhrase", "BAD REQUEST");
			context.setVariable("http.statusCode", "400");
			context.setVariable("log.severity", "Error");       
			errorHandling.push({
				errorCode : errorCode,
				errorMessage : errorMessage
			});
		}
	}
}

//number check for input variables
if (applicationId !== null && applicationId !== "" && applicationId !== undefined) {
	if ((!(re_appId)) || (applicationId <= 0)) {
		var errorCode = "40009";
		var errorMessage = "applicationId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


if (groupId !== null && groupId !== "" && groupId !== undefined) {
    if (!(groupId.includes("users")))
    {
        if ((!(re_groupId)) || (groupId <= 0)) {
		    var errorCode = "40009";
	    	var errorMessage = "groupId contains unexpected data";
	    	context.setVariable("http.reasonPhrase", "BAD REQUEST");
	    	context.setVariable("http.statusCode", "400");
	    	context.setVariable("log.severity", "Error");       
		    errorHandling.push({
		    	errorCode : errorCode,
		    	errorMessage : errorMessage
	    	});
    	}
    }
}    
if (userId !== null && userId !== "" && userId !== undefined) {
	if ((!(re_userId)) || (userId <= 0)) {
		var errorCode = "40009";
		var errorMessage = "userId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

/*if (createdBy !== null && createdBy !== "" && createdBy !== undefined) {
	if ((!(re_createdBy)) || createdBy <= 0 ) {
		var errorCode = "40009";
		var errorMessage = "createdBy contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

if (modifiedBy !== null && modifiedBy !== "" && modifiedBy !== undefined) {
	if ((!(re_modifiedBy)) || modifiedBy <= 0 ) {
		var errorCode = "40009";
		var errorMessage = "modifiedBy contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}*/
if (isDeleted !== null && isDeleted !== "" && isDeleted !== undefined) {
	if (!(re_isDeleted)) {
		var errorCode = "40009";
		var errorMessage = "isDeleted contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


//Alphabets Check
if (applicationName !== null && applicationName !== "" && applicationName !== undefined) {
	if (!(re_appName)) {
		var errorCode = "40009";
		var errorMessage = "applicationName contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

if (applicationStatus !== null && applicationStatus !== "" && applicationStatus !== undefined) {
	if (!(re_appStatus)) {
		var errorCode = "40009";
		var errorMessage = "applicationStatus contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

//Email Check

if (userEmail !== null && userEmail !== "" && userEmail !== undefined) {
    	if (!(re_userEmail)) {
		var errorCode = "40009";
		var errorMessage = "User Email contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


//mandatory check array declarations
var arrayMandatory = [];
var mandate_var_list = [];

// mandatory fields check for create application
if((reqUri == "/gnf/applications") && (verb == "POST"))
{   
	arrayMandatory.push({
		type: "applicationName",
		value: applicationName
	});
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	if(isAppPrefValidJson){
		arrayMandatory.push({
			type: "applicationPreference",
			value: applicationPreference
		});
	}   

	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}

// mandatory fields check for update  application
if((reqUri == "/gnf/applications") && (verb == "PUT"))
{ 
	arrayMandatory.push({
		type: "applicationId",
		value: applicationId
	}); 
	arrayMandatory.push({
		type: "applicationName",
		value: applicationName
	});
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	if(isAppPrefValidJson){
		arrayMandatory.push({
			type: "applicationPreference",
			value: applicationPreference
		});   
	}   
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}
// mandatory check function
if(mandate_var_list.length > 0){
	var errorCode = "40008";
	var errorMessage = "Request expects the following fields "+ mandate_var_list;
	context.setVariable("http.reasonPhrase", "BAD REQUEST");
    context.setVariable("http.statusCode", "400");
	context.setVariable("log.severity", "Error");       
    errorHandling.unshift({
		errorCode : errorCode,
        errorMessage : errorMessage
    }); 
}

function mandatoryCheck(arrayMandatory) {
	for (var i = 0; i < arrayMandatory.length; i++){ 
		if (arrayMandatory[i].value === null || arrayMandatory[i].value === "" || arrayMandatory[i].value.length < 1)  {       
			mandate_var_list.push(arrayMandatory[i].type);
		}	
	}
}

//setting the check to invoke raise fault 
if(errorHandling.length>0)
{
	print(errorHandling.length);
	context.setVariable("isError", "true"); 
	context.setVariable("flow.error.code",JSON.stringify(errorHandling));
}