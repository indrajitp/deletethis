//input validations
var sourceId = context.getVariable("sid");
var sourceTransactionId = context.getVariable("sourceTxnId");
var globalTransactionId =  context.getVariable("gid");

var  alphaNumeric = /^[0-9a-zA-Z]+$/;
var alpahbets = /^[a-zA-Z]*$/;
var numbers = /^[0-9]*$/;

var reAlpNum = new RegExp(alphaNumeric);
var reAlphs = new RegExp(alpahbets);
var reNumbers = new RegExp(numbers);

var re_sid = reNumbers.test(sourceId);
var re_sTxnId = reAlpNum.test(sourceTransactionId);
var errorHandling = [];
var source_fields = [sourceId, sourceTransactionId];

if (globalTransactionId === "" || globalTransactionId === null ) {
    if (!isAnyObjectNull(source_fields)) {
		var errorCode = "4008";
		var errorMessage = "Request expects the following fields sourceTransactionId,sourceId";
		context.setVariable("http.reasonPhrase", "BAD REQUEST");
		context.setVariable("http.statusCode", "400");
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

//number check for input variables
if (sourceId !== null && sourceId !== "" && sourceId !== undefined) {
	if (!(re_sid)) {
		var errorCode = "4009";
		var errorMessage = "SourceId contains unexpected data";
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
		var errorCode = "4009";
		var errorMessage = "sourceTransactionId contains unexpected data";
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
