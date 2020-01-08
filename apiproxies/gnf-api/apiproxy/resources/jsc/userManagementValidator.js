// jshint esversion: 6
//GNF:Validations on User management 
var preferredChannel = context.getVariable("preferredChannel");
var userId = context.getVariable("uId");
var userIds = context.getVariable("uIds");
var groupIds = context.getVariable("gIds");
var appIds = context.getVariable("appIds");
var fromGroup = context.getVariable("fromGroup");
var toGroup = context.getVariable("toGroup");
var userEmail =  context.getVariable("userEmail");
/*var modifiedBy = context.getVariable("modifiedBy"); */
var languageCode = context.getVariable("languageCode");
var userName  =  context.getVariable("userName");
var userStatus =  context.getVariable("userStatus");
/*var createdBy =  context.getVariable("createdBy");*/
var faxNumber =  context.getVariable("faxNumber"); 
var mobileNumber =  context.getVariable("mobileNumber");
var email =  context.getVariable("email"); 
var preferredEndTime =  context.getVariable("preferredEndTime");
var optIn =  context.getVariable("optIn");
var preferredStartTime =  context.getVariable("preferredStartTime");
var timezone =  context.getVariable("timezone");
var isEmailValid =  context.getVariable("isEmailValid");
var isMobileValid =  context.getVariable("isMobileValid");
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
const booleanEnum = {
	true: 1,
	false: 2
};
const notiChannelEnum = { 
    SMS: 1,
    EMAIL: 2,
	RCS: 3,
	FAX: 4,
	CALL: 5
    
};
//regex declarations
var mail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
var mobileNum = /^([0+[0-9]{1,3})[- ]?([0-9]{10})$/;
var alpahbets = /^[a-zA-Z]*$/;
var numbers = /^[0-9]*$/;
var timeZne = /^[A-Z][a-z]*[/]([A-Z][a-z]*)/;

var reEmail = new RegExp(mail);
var reMobileNumber = new RegExp(mobileNum);
var reAlphs = new RegExp(alpahbets);
var reNumbers = new RegExp(numbers);
var reTimeZone = new RegExp(timeZne );

//applying regex on input params
var re_fromGroup = reNumbers.test(fromGroup); 
var re_toGroup = reNumbers.test(toGroup); 
/*var re_createdBy = reNumbers.test(createdBy);
var re_modifiedBy = reNumbers.test(modifiedBy);*/
var re_userId = reNumbers.test(userId);
var re_userName = reAlphs.test(userName );
var re_userEmail = reEmail.test(userEmail);
var re_email = reEmail.test(email);
var re_languageCode = reAlphs.test(languageCode);
var re_timezone = reTimeZone.test(timezone);
var re_mobileNumber = reMobileNumber.test(mobileNumber);
var re_userStatus = reAlphs.test(userStatus );
var re_appIds = reNumbers.test(appIds);

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

if (userIds !== null && userIds !== "" && userIds !== undefined) {
    //removing comas if multiple group Ids are passed in the request
    var userIdsString = userIds.toString();
    print("after string"+userIdsString);
    var userIdsNumbers = userIdsString.replace(/,/g, "");
     print("after replace" +groupIdsNumbers);
    var re_userIds = reNumbers.test(userIdsNumbers);
	if (!(re_userIds)) {
		var errorCode = "40009";
		var errorMessage = "userIds contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
	    });
    }
}

if (appIds !== null && appIds !== "" && appIds !== undefined) {  
    //removing comas if multiple group Ids are passed in the request
    var appIdsString = appIds.toString();
    var appIdsNumbers = appIdsString.replace(/,/g, "");
    var re_appIds = reNumbers.test(appIdsNumbers);
	if (!(re_appIds)) {
		var errorCode = "40009";
		var errorMessage = "applicationIds contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
	    });
    }
}

if (groupIds !== null && groupIds !== "" && groupIds !== undefined) {   
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

if (userId !== null && userId !== "" && userId !== undefined) {
	if ((!(reqUri.includes("list"))) && (!(reqUri.includes("roles"))) && (!(reqUri.includes("details"))) && (!(reqUri.includes("upload")))) {
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
}

if (fromGroup !== null && fromGroup !== "" && fromGroup !== undefined) {
	if ((!(re_fromGroup)) || (fromGroup <= 0)) {
		var errorCode = "40009";
	    var errorMessage = "fromGroup contains unexpected data";
	    context.setVariable("http.reasonPhrase", "BAD REQUEST");
	    context.setVariable("http.statusCode", "400");
	    context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
		    errorMessage : errorMessage
	    });
    }
}

if (toGroup !== null && toGroup !== "" && toGroup !== undefined) {
	if ((!(re_toGroup)) || (toGroup <= 0)) {
		var errorCode = "40009";
	    var errorMessage = "toGroup contains unexpected data";
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

//Alphabets Check

if (languageCode !== null && languageCode !== "" && languageCode !== undefined) {
	if (!(re_languageCode)) {
		var errorCode = "40009";
		var errorMessage = "languageCode contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
} 
if (userName  !== null && userName  !== "" && userName  !== undefined) {
	if (!(re_userName)) {
		var errorCode = "40009";
		var errorMessage = "userName contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (userStatus  !== null && userStatus  !== "" && userStatus  !== undefined) {
	if (!(re_userStatus)) {
		var errorCode = "40009";
		var errorMessage = "userStatus contains unexpected data";
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

if (email !== null && email !== "" && email !== undefined) {
	if (!(re_email)) {
		var errorCode = "40009";
		var errorMessage = "email contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}  
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

//mobile number check
/*if (mobileNumber !== null && mobileNumber !== "" && mobileNumber !== undefined) {
	if (!(re_mobileNumber)) {
		var errorCode = "40009";
		var errorMessage = "mobileNumber contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}*/
if (timezone !== null && timezone !== "" && timezone !== undefined) {
	if (!(re_timezone)) {
		var errorCode = "40009";
		var errorMessage = "timezone contains unexpected data";
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
 
if (preferredChannel !== null && preferredChannel !== "") {
    if (!notiChannelEnum[preferredChannel]) {
		var errorCode = "40009";
		var errorMessage = "preferredChannel contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});       
    }
}

if (optIn !== null && optIn !== "") {
    if (!booleanEnum[optIn])  {
		var errorCode = "40009";
		var errorMessage = "optIn contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}

if (isEmailValid !== null && isEmailValid !== "") {
    if (!booleanEnum[isEmailValid])  {
		var errorCode = "40009";
		var errorMessage = "isEmailValid contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (isMobileValid !== null && isMobileValid !== "") {
    if (!booleanEnum[isMobileValid])  {
		var errorCode = "40009";
		var errorMessage = "isMobileValid contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
// mandatory fields check for Add user details
if((reqUri == "/gnf/users/details") && (verb == "POST")) {
	arrayMandatory.push({
		type: "email",
		value: email
	});
	arrayMandatory.push({
		type: "userName",
		value: userName
	});
  
	arrayMandatory.push({
		type: "userStatus",
		value: userStatus
	});
/*	arrayMandatory.push({
		type: "createdBy",
		value: createdBy
	});*/ 
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}
print("aaaa"+reqUri);
// mandatory fields check for update user details
if((reqUri == "/gnf/users/details") && (verb == "PUT")) {
	arrayMandatory.push({
		type: "email",
		value: email
	});
	arrayMandatory.push({
		type: "userId",
		value: userId
	});
	arrayMandatory.push({
		type: "userName",
		value: userName
	});
  
	arrayMandatory.push({
		type: "userStatus",
		value: userStatus
	});
/*	arrayMandatory.push({
		type: "modifiedBy",
		value: modifiedBy
	}); */
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}

// mandatory fields check for Add user notification preferences
if((reqUri == "/gnf/users/notification/preference") && (verb == "POST")){
	arrayMandatory.push({
		type: "userId",
		value: userId
	});	
	/*arrayMandatory.push({
		type: "createdBy",
		value: createdBy
	});*/
	arrayMandatory.push({
		type: "preferredChannel",
		value: preferredChannel
	});
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}  
// mandatory fields check for Update user notification preferences
if((reqUri == "/gnf/users/notification/preference") && (verb == "PUT")){
	arrayMandatory.push({
		type: "userId",
		value: userId
	});
/*	arrayMandatory.push({
		type: "modifiedBy",
		value: modifiedBy
	});*/
	arrayMandatory.push({
		type: "preferredChannel",
		value: preferredChannel
	});	
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
}  
// mandatory fields check for Add user preferences
if((reqUri == "/gnf/users/preferences") && (verb == "POST")){ 
	arrayMandatory.push({
		type: "userId",
		value: userId
	});
	arrayMandatory.push({
		type: "createdBy",
		value: createdBy
	});
	arrayMandatory.push({
		type: "userEmail",
		value: userEmail
	});
	//manadtory check function call
	mandatoryCheck(arrayMandatory);
} 
// mandatory fields check for Update user preferences
if((reqUri == "/gnf/users/preferences") && (verb == "PUT")){ 
	arrayMandatory.push({
		type: "userId",
		value: userId
	});
/*	arrayMandatory.push({
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