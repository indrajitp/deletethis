// jshint esversion: 6
//GNF:Validations on Group management 
var groupIds = context.getVariable("gIds");
var userId = context.getVariable("uId");
var userEmail =  context.getVariable("userEmail");
var applicationId = context.getVariable("aId"); 
var groupId = context.getVariable("gId");
var groupName  =  context.getVariable("grpName");
var groupStatus =  context.getVariable("grpStatus");
/*var createdBy =  context.getVariable("createdBy");*/
var groupAuthLevel =  context.getVariable("grpAuthLevel"); 
/*var modifiedBy =  context.getVariable("modifiedBy");*/
var grpEmailId =  context.getVariable("grpEmailId");
var groupMobileNumber =  context.getVariable("groupMobileNumber");
var groupMobileShortCode =  context.getVariable("groupMobileShortCode");
var groupUnsubscribe =  context.getVariable("groupUnsubscribe");
var replyTo =  context.getVariable("replyTo");
var groupEmailProvider =  context.getVariable("grpEmailProvider");
var groupSmsProvider =  context.getVariable("grpSmsProvider");
var isCustomAttrValidJson = true;

//mandatory check array declarations
var arrayMandatory = [];
var mandate_var_list = [];
var errorHandling = [];
//checking Custom Attribute has valid json 
try {
	var customAttribute = JSON.parse(context.getVariable("customAttribute"));
}
catch (e) {
   isCustomAttrValidJson = false ;
	print("Error:"+e);
    var errorCode = "40009";
	var errorMessage = "customAttribute contains unexpected data";
	context.setVariable("http.reasonPhrase", "BAD REQUEST");
	context.setVariable("http.statusCode", "400");
	context.setVariable("log.severity", "Error");       
	errorHandling.push({
		errorCode : errorCode,
		errorMessage : errorMessage
	});
}

//declaring enum values
const smsNotiProviderEnum = { 
    TwilioSMS: 1,
    OpenMarketSMS: 2
};

const emailNotiProviderEnum = {
    SendGridEmail: 1,
    JangoMailEmail: 2
};

const booleanEnum = {
	true: 1,
	false: 2
};
//regex declarations
var mail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
var mobileNumber = /^([0+[0-9]{1,3})[- ]?([0-9]{10})$/;
var alpahbets = /^[a-zA-Z]*$/;
var numbers = /^[0-9]*$/;

var reEmail = new RegExp(mail);
var reMobileNumber = new RegExp(mobileNumber);
var reAlphs = new RegExp(alpahbets);
var reNumbers = new RegExp(numbers);

//applying regex on input params
var re_appId = reNumbers.test(applicationId);
var re_groupId = reNumbers.test(groupId);
/*var re_createdBy = reNumbers.test(createdBy);
var re_modifiedBy = reNumbers.test(modifiedBy);*/
var re_userId = reNumbers.test(userId);
var re_grpAuthLevel = reNumbers.test(groupAuthLevel);
var re_grpName = reAlphs.test(groupName );
var re_userEmail = reEmail.test(userEmail);
var re_grpStatus = reAlphs.test(groupStatus);
var re_grpEmailId = reEmail.test(grpEmailId);
var re_groupMobileNumber = reMobileNumber.test(groupMobileNumber);
var re_groupMobileShortCode = reNumbers.test(groupMobileShortCode);
var re_replyTo = reEmail.test(replyTo);

//getting incomming verb and request uri
var verb = context.getVariable("request.verb");
var reqUri = context.getVariable("request.uri");

//mandatory check for User Email field
if(verb !== "POST" || verb !== "PUT") {
	//mandatory field check for input variables
	if (userEmail === null || userEmail === "") {
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

//number check for input variables
if (groupId !== null && groupId !== "" && groupId !== undefined) {
	if ((!(re_groupId)) || (groupId <= 0)) {
		if ((!(reqUri.includes("details"))) && (!(reqUri.includes("users")))){
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

if (groupIds !== null && groupIds !== "" && groupIds !== undefined) {
	if(!(reqUri.includes("preferences"))){
		//removing comas if multiple group Ids are passed in the request
		var groupIdsString = groupIds.toString();
		var groupIdsNumbers = groupIdsString.replace(/,/g, "");
		var re_groupIds = reNumbers.test(groupIdsNumbers);
			if (!(re_groupIds)) {
			var errorCode = "40009";
			var errorMessage = "groupIds contains unexpected data";
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
	if (!(re_userId)) {
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


if (applicationId !== null && applicationId !== "" && applicationId !== undefined) {
	if (!(re_appId)) {
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
/*print("createdby"+createdBy);
if (createdBy !== null && createdBy !== "" && createdBy !== undefined) {
	if ((!(re_createdBy)) || (createdBy <= 0)) {
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
if (groupAuthLevel !== null && groupAuthLevel !== "" && groupAuthLevel !== undefined) {
	if (((groupAuthLevel <-1) || (groupAuthLevel >1000)) || (!(re_grpAuthLevel))){
		var errorCode = "40009";
		var errorMessage = "groupAuthLevel contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


if (groupMobileShortCode !== null && groupMobileShortCode !== "" && groupMobileShortCode !== undefined) {
	if ((!(re_groupMobileShortCode))){
		var errorCode = "40009";
		var errorMessage = "groupMobileShortCode contains unexpected data";
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

if (groupStatus !== null && groupStatus !== "" && groupStatus !== undefined) {
	if (!(re_grpStatus)) {
		var errorCode = "40009";
		var errorMessage = "groupStatus contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
} 
if (groupName  !== null && groupName  !== "" && groupName  !== undefined) {
	if (!(re_grpName)) {
		var errorCode = "40009";
		var errorMessage = "groupName contains unexpected data";
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

if (grpEmailId !== null && grpEmailId !== "" && grpEmailId !== undefined) {
	if (!(re_grpEmailId)) {
		var errorCode = "40009";
		var errorMessage = "groupEmailId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

//mobile number check
if (groupMobileNumber !== null && groupMobileNumber !== "" && groupMobileNumber !== undefined) {
	if (!(re_groupMobileNumber)) {
		var errorCode = "40009";
		var errorMessage = "groupMobileNumber contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (replyTo !== null && replyTo !== "" && replyTo !== undefined) {
	if (!(re_replyTo)) {
		var errorCode = "40009";
		var errorMessage = "replyTo contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
//enum values check
 if (groupSmsProvider !== null && groupSmsProvider !== "") {
	if ((!smsNotiProviderEnum[groupSmsProvider])) {
		var errorCode = "40009";
		var errorMessage = "groupSmsProvider contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error"); 			
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});			
	}	
}
if (groupEmailProvider !== null && groupEmailProvider !== "") {
	if ((!emailNotiProviderEnum[groupEmailProvider])) {
		var errorCode = "40009";
		var errorMessage = "groupEmailProvider contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error"); 			
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});			
	}	
}


// mandatory fields check for create application
if(((reqUri == "/gnf/groups/details") ||(reqUri == "/gnf/groups/details/preferences"))&& (verb == "POST")) {
	arrayMandatory.push({
		type: "groupAuthLevel",
		value: groupAuthLevel
	});
	arrayMandatory.push({
		type: "groupStatus",
		value: groupStatus
	}); 
	arrayMandatory.push({
		type: "applicationId",
		value: applicationId
	});
	/*arrayMandatory.push({
		type: "createdBy",
		value: createdBy
	});*/
	arrayMandatory.push({
		type: "groupName",
		value: groupName
	}); 
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}
if((reqUri == "/gnf/groups/preferences") && (verb == "POST")){ 	
	/*arrayMandatory.push({
		type: "createdBy",
		value: createdBy
	});*/
	arrayMandatory.push({
		type: "groupId",
		value: groupId
	}); 
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}
if((reqUri == "/gnf/groups/preferences") && (verb == "PUT")){
	arrayMandatory.push({
		type: "groupId",
		value: groupId
	});	
	/*arrayMandatory.push({
		type: "modifiedBy",
		value: modifiedBy
	});*/
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}  
// mandatory fields check for update  application
if((reqUri == "/gnf/groups/details") && (verb == "PUT")){
	arrayMandatory.push({
		type: "groupId",
		value: groupId
	});
	arrayMandatory.push({
		type: "groupAuthLevel",
		value: groupAuthLevel
	});
	arrayMandatory.push({
		type: "groupStatus",
		value: groupStatus
	});
  
	arrayMandatory.push({
		type: "applicationId",
		value: applicationId
	});
	/*arrayMandatory.push({
		type: "modifiedBy",
		value: modifiedBy
	});*/
	arrayMandatory.push({
		type: "groupName",
		value: groupName
	});
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
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