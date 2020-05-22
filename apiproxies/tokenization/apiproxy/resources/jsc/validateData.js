// get all input variables for validation
var mid = context.getVariable("mid");
var pan = context.getVariable("private.pan");
var tnumber = context.getVariable("private.tnumber");
var path = context.getVariable("proxy.pathsuffix");

// regex varaible
var letters = /^[0-9a-zA-Z]+$/;
var numbers = /^[0-9]*$/;
var year = /^(19[0-8][0-9]|199[0-9]|[2-9][0-9]{3})$/;
var month = /^(0[1-9]|1[0-2])$/;

var reLetter = new RegExp(letters);
var reNumber = new RegExp(numbers);
var re_mid = reLetter.exec(mid);
var re_pan = reNumber.exec(pan);
var re_tnumber = reLetter.exec(tnumber);


// intialize validate variables
var validPayload = "false";

// validate payload attributes as per pathsuffix

if (path == "/merchant/number") {

	if ((mid !== null)
			&& (mid !== "")
			&& (pan !== null)
			&& (pan !== "")
			&& (pan.length < 27)
			&& (pan.length > 1)
			&& (re_pan)
			) {

		validPayload = "true";

	}

} else if (path == "/number") {

	if ((mid !== null)
			&& (mid !== "")
			&& (pan !== null)
			&& (pan !== "")
			&& (pan.length < 27)
			&& (pan.length > 1)
			&& (re_pan)) {

		validPayload = "true";

	}

}else if (path == "/global/number") {

	if ((pan !== null)
			&& (pan !== "")
			&& (pan.length < 27)
			&& (pan.length > 1)
			&& (re_pan)) {

		validPayload = "true";

	}

} 
else if (path == "/token") {

	if ((tnumber !== null) && (tnumber !== "") && (re_tnumber)) {

		validPayload = "true";

	}

}
if(validPayload == "false"){
	context.setVariable("validPayload", validPayload);
	context.setVariable("errortype", "Bad Request");
	context.setVariable("errorCode", "400");
}
