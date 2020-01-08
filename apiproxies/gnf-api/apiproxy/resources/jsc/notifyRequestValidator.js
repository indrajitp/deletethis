 // jshint esversion: 6
 //GNF:Validations on Notification request 

 //header details
var sourceId = context.getVariable("sid");
var sourceTransactionId = context.getVariable("sourceTxnId");

 //notification  details
var destinationType = context.getVariable("destinationType");
var message = context.getVariable("messageContent");
var messageCategory = context.getVariable("messageCategory");
var msgPriority = context.getVariable("messagePriority");
var smsNotiProvider = context.getVariable("smsNotificationProvider");
var emailNotiProvider = context.getVariable("emailNotificationProvider");
var notificationChannel = context.getVariable("notificationChannel");

 //Scheduled Notification details
var isScheduled = context.getVariable("isScheduled");
var schedulingEta = context.getVariable("schedulingEta");
var timezone = context.getVariable("timezone");

 //Recurring notification details
var isRecurring = context.getVariable("isRecurring");
var recurNum = context.getVariable("recurrenceNumber");
var recurUnit = context.getVariable("recurrenceUnit");
var maxRecurCnt = context.getVariable("maxRecurringCount");
var sendImmed = context.getVariable("sendImmediately");

 //Multi message details
var multiMsgFlag = context.getVariable("multiMessageFlag");
var multiMsgNum = context.getVariable("multiMessageNumber");
var multiMsgTotal = context.getVariable("multiMessageTotal");

 //template details
var useTemplate = context.getVariable("useTemplate");
var tempId = context.getVariable("templateId");
var tempType = context.getVariable("templateType");

 //retry details
var retryMsgFlag = context.getVariable("retryMessageFlag");
var maxRetryCnt = context.getVariable("maxRetryCount");
   
 // regex varaible
var alphaNumeric = /^[0-9a-zA-Z]+$/;
var alpahbets = /^[a-zA-Z]*$/;
var numbers = /^[0-9]*$/;
var templId = /^[a-zA-Z][a-zA-Z_0-9]+$/;
var timeZne = /^[A-Z][a-z]*[/]([A-Z][a-z]*)/;
var eta = /^([0]{0,1}[1-9]|1[012])\/([1-9]|([012][0-9])|(3[01]))\/\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/;

//regex methods
var reAlpNum = new RegExp(alphaNumeric);
var reAlphs = new RegExp(alpahbets);
var reNumbers = new RegExp(numbers);
var reTemplId = new RegExp(templId);
var reTimezne = new RegExp(timeZne);
var reEta = new RegExp(eta);

//applying regex on input data

var re_sid = reNumbers.test(sourceId);
var re_sTxnId = reAlpNum.test(sourceTransactionId);
var re_msgPriority = reNumbers.test(msgPriority);

var re_msgCategory = reAlphs.test(messageCategory); 
var re_schedulingEta = reEta.test(schedulingEta);
var re_timezone = reTimezne.test(timezone);
var re_recurNum = reNumbers.test(recurNum);
var re_maxRetryCnt = reNumbers.test(maxRetryCnt);
var re_multiMsgNum = reNumbers.test(multiMsgNum);
var re_multiMsgTotal = reNumbers.test(multiMsgTotal);
var re_tempId = reTemplId.test(tempId);
var re_maxRecurCnt = reNumbers.test(maxRecurCnt);
var errorCode = '';
var errorMessage = '';

//error Handling
var errorHandling = [];
var isDestinationValidJson = true;
// extracting destinations with try-catch blocks
try {
	var destinations = JSON.parse(context.getVariable("destinations"));
	var destString = destinations.toString();
	var destNumbers = destString.replace(/,/g, "");
    var re_dest = reNumbers.test(destNumbers);
}catch (e) {
    isDestinationValidJson = false ;
	print("Error:"+e);
    var errorCode = "40009";
	var errorMessage = "destinations contains unexpected data";
	context.setVariable("http.reasonPhrase", "BAD REQUEST");
	context.setVariable("http.statusCode", "400");
	context.setVariable("log.severity", "Error");       
	errorHandling.push({
		errorCode : errorCode,
		errorMessage : errorMessage
	});
}

//declaring enum values
const notiChannelEnum = { 
    SMS: 1,
    EMAIL: 2,
	RCS: 3,
	FAX: 4,
	CALL: 5
    
};

const destTypeEnum = {
    USER: 1,
    GROUP: 2
};

const recurUnitEnum = {
    MINUTES: 1,
    HOURS: 2,
	DAYS: 3,
	WEEKS: 4
};  

const tempTypeEnum = {  
    GNF: 1,
    PROVIDER: 2
};

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

//manadtory fields list
var arrayMandatory = [];

var is_mandate = false;
var mandate_var_list = [];
var validPayload = "false";
var isError = "false";

arrayMandatory.push({
    type: "sourceId",
    value: sourceId
});
arrayMandatory.push({
    type: "destinationType",
    value: destinationType
});
if(isDestinationValidJson){
    arrayMandatory.push({
        type: "destinations",
        value: destinations
    });
}
arrayMandatory.push({
    type: "message",
    value: message
});


//manadtory fields check function

function mandatoryCheck(arrayMandatory) {
	for (var i = 0; i < arrayMandatory.length; i++){ 
		if (arrayMandatory[i].value === null || arrayMandatory[i].value === "" || arrayMandatory[i].value.length < 1)  {       
			mandate_var_list.push(arrayMandatory[i].type);
		}	
	}
}

//manadtory check execution
mandatoryCheck(arrayMandatory);

// mandatory check
if(mandate_var_list.length > 0){
	errorCode  = "40008";
	errorMessage = "Request expects the following fields "+ mandate_var_list;
	context.setVariable("http.reasonPhrase", "BAD REQUEST");
    context.setVariable("http.statusCode", "400");
	context.setVariable("log.severity", "Error");       
    errorHandling.unshift({
		errorCode : errorCode,
        errorMessage : errorMessage
    }); 
}

//manual fields check

//Multi message fields
var multiMsg_fields = [multiMsgNum,multiMsgTotal,sourceTransactionId];
if (multiMsgFlag === "true") {
    if (!isAnyObjectNull(multiMsg_fields)) {
		errorCode = "40008";
		errorMessage = "Request expects the following fields multiMessageNumber, multiMessageTotal, sourceTransactionId";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
            errorMessage : errorMessage
        });
   }
}

//scheduling fields
var sched_fields = [schedulingEta, timezone];
if (isScheduled === "true") {
    if (!isAnyObjectNull(sched_fields)) {
		errorCode = "40008";
		errorMessage = "Request expects the following fields schedulingEta,timezone";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
            errorMessage : errorMessage
                      });
    }
}

//Recurring fields

var recurring_fields = [recurNum,recurUnit];
if (isRecurring === "true") {
   if (!isAnyObjectNull(recurring_fields)) {
     errorCode = "40008";
	 errorMessage = "Request expects the following fields recurrenceNumber,recurrenceUnit";
     context.setVariable("http.reasonPhrase", "BAD REQUEST");
     context.setVariable("http.statusCode", "400");
	 context.setVariable("log.severity", "Error");       
     errorHandling.push({
		errorCode : errorCode,
        errorMessage : errorMessage
                       });
    }
}

 //template fields
 var template_fields = [tempId,tempType];
if (useTemplate === "true") {
    if (!isAnyObjectNull(template_fields)) {
      errorCode = "40008";
	  errorMessage = "Request expects the following fields templateId,templateType";
      context.setVariable("http.reasonPhrase", "BAD REQUEST");
      context.setVariable("http.statusCode", "400");
	  context.setVariable("log.severity", "Error");       
      errorHandling.push({
		errorCode : errorCode,
        errorMessage : errorMessage
                       });
    }
}
       
//function checks if any field is null for manual fields
function isAnyObjectNull(items) {
    is_mandate = false;
	if (items !== null) {
		for (var j = 0; j < items.length; j++) {

			if (items[j] === null || items[j] === "") {
				is_mandate = false;
				break;
			} else {
				is_mandate = true;
			 }
        }
	}

    return is_mandate;
}

// enum check for input vars
if (destinationType !== null && destinationType !== "") {
    if (!destTypeEnum[destinationType]) {
		errorCode = "40009";
		errorMessage = "destinationType contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
        errorHandling.push({
          errorCode : errorCode,
          errorMessage : errorMessage
                       });
    }
}
(function() {
    var errorCode = '';
    var errorMessage = '';
//both check
    if (smsNotiProvider !== null && smsNotiProvider !== "" && emailNotiProvider !== null && emailNotiProvider !== "") {
		if ((!smsNotiProviderEnum[smsNotiProvider]) || (!emailNotiProviderEnum[emailNotiProvider])) {
			errorCode = "40009";
			errorMessage = "notificationProvider contains unexpected data";
			context.setVariable("http.reasonPhrase", "BAD REQUEST");
			context.setVariable("http.statusCode", "400");
			context.setVariable("log.severity", "Error"); 
			print("both");			
			errorHandling.push({
			  errorCode : errorCode,
			  errorMessage : errorMessage
			});
			
			return ;	
		}	
	}
	//email check
	if (emailNotiProvider !== null && emailNotiProvider !== "") {
		if (!emailNotiProviderEnum[emailNotiProvider]) {
			errorCode = "40009";
			errorMessage = "notificationProvider contains unexpected data";
			context.setVariable("http.reasonPhrase", "BAD REQUEST");
			context.setVariable("http.statusCode", "400");
			context.setVariable("log.severity", "Error");
			print("email");			
			errorHandling.push({
			  errorCode : errorCode,
			  errorMessage : errorMessage
			});
			
			return ;
		}
	}        
	//sms check
	if (smsNotiProvider !== null && smsNotiProvider !== "") {
		if (!smsNotiProviderEnum[smsNotiProvider]) {
			errorCode = "40009";
			errorMessage = "notificationProvider contains unexpected data";
			context.setVariable("http.reasonPhrase", "BAD REQUEST");
			context.setVariable("http.statusCode", "400");
			context.setVariable("log.severity", "Error");
			print("sms");			
			errorHandling.push({
			  errorCode : errorCode,
			  errorMessage : errorMessage
			});
			
			return ;
		}
	}        

})();
    
if (notificationChannel !== null && notificationChannel !== "") {
    if (!notiChannelEnum[notificationChannel]) {
		errorCode = "40009";
		errorMessage = "notificationChannel contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});       
    }
}

if (recurUnit !== null && recurUnit !== "") {
    if (!recurUnitEnum[recurUnit])  {
		errorCode = "40009";
		errorMessage = "recurrenceUnit contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});       
    }
} 

if (tempType !== null && tempType !== "") {
    if (!tempTypeEnum[tempType])  {
		errorCode = "40009";
		errorMessage = "templateType contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}

//Boolean values enum check for input variables
if (isScheduled !== null && isScheduled !== "") {
    if (!booleanEnum[isScheduled])  {
		errorCode = "40009";
		errorMessage = "isScheduled contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (isRecurring !== null && isRecurring !== "") {
    if (!booleanEnum[isRecurring])  {
	    errorCode = "40009";
		errorMessage = "isRecurring contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (useTemplate !== null && useTemplate !== "") {
    if (!booleanEnum[useTemplate])  {
		errorCode = "40009";
		errorMessage = "useTemplate contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (multiMsgFlag !== null && multiMsgFlag !== "") {
    if (!booleanEnum[multiMsgFlag])  {
		errorCode = "40009";
		errorMessage = "multiMessageFlag contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (retryMsgFlag !== null && retryMsgFlag !== "") {
    if (!booleanEnum[retryMsgFlag])  {
		errorCode = "40009";
		errorMessage = "retryMessageFlag contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});        
    }
}
if (sendImmed !== null && sendImmed !== "") {
    if (!booleanEnum[sendImmed])  {
		errorCode = "40009";
		errorMessage = "sendImmediately contains unexpected data";
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
if (sourceId !== null && sourceId !== "" && sourceId !== undefined) {
	if (!(re_sid)) {
		errorCode = "40009";
		errorMessage = "SourceId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

if (destinations !== null && destinations !== "" && destinations !== undefined) {
	if (!(re_dest)) {
		errorCode = "40009";
		errorMessage = "destinations contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error"); 
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


if (msgPriority !== null && msgPriority !== "" && msgPriority !== undefined) {
	if (!(re_msgPriority)) {
		errorCode = "40009";
		errorMessage = "messagePriority contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

if (recurNum !== null && recurNum !== "" && recurNum !== undefined) {
	if (!(re_recurNum)) {
		errorCode = "40009";
		errorMessage = "recurrenceNumber contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (recurNum !== null && recurNum !== "" && recurNum !== undefined) {
	if (!(re_recurNum)) {
		errorCode = "40009";
		errorMessage = "recurrenceNumber contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (maxRecurCnt !== null && maxRecurCnt !== "" && maxRecurCnt !== undefined) {
	if (!(re_maxRecurCnt)) {
		errorCode = "40009";
		errorMessage = "maxRecurringCount contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}

if (multiMsgNum !== null && multiMsgNum !== "" && multiMsgNum !== undefined) {
	if (!(re_multiMsgNum)) {
		errorCode = "40009";
		errorMessage = "multiMessageNumber contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (multiMsgTotal !== null && multiMsgTotal !== "" && multiMsgTotal !== undefined) {
	if (!(re_multiMsgTotal)) {
		errorCode = "40009";
		errorMessage = "multiMessageTotal contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (maxRetryCnt !== null && maxRetryCnt !== "" && maxRetryCnt !== undefined) {
	if (!(re_maxRetryCnt)) {
		errorCode = "40009";
		errorMessage = "maxRetryCount contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
//Alphabets check
if (messageCategory !== null && messageCategory !== "" && messageCategory !== undefined) {
	if (!(re_msgCategory)) {
		errorCode = "40009";
		errorMessage = "messageCategory contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
//Alphanumeric Check

if (sourceTransactionId !== null && sourceTransactionId !== "" && sourceTransactionId !== undefined) {
	if (!(re_sTxnId)) {
		errorCode = "40009";
		errorMessage = "sourceTransactionId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}


//patterns check for input variables
if (tempId !== null && tempId !== "" && tempId !== undefined) {
	if (!(re_tempId)) {
		errorCode = "40009";
		errorMessage = "templateId contains unexpected data";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (schedulingEta !== null && schedulingEta !== "" && schedulingEta !== undefined) {
	if (!(re_schedulingEta)) {
		errorCode = "40010";
		errorMessage = "schedulingEta is not in proper format";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
if (timezone !== null && timezone !== "" && timezone !== undefined) {
	if (!(re_timezone)) {
	    
		var errorCode = "40010";
		var errorMessage = "timezone is not in proper format";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
		context.setVariable("log.severity", "Error");       
		errorHandling.push({
			errorCode : errorCode,
			errorMessage : errorMessage
		});
	}
}
//setting the check to invoke raise fault 
if(errorHandling.length>0)
{
print(errorHandling.length);
context.setVariable("isError", "true"); 
context.setVariable("flow.error.code",JSON.stringify(errorHandling));
}




   