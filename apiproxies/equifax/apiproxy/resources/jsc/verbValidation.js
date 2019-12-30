  var incomingVerb = context.getVariable("request.verb");

 var validateMethod;
 
 if (incomingVerb == "POST" || incomingVerb == "OPTIONS" )
 {
 validateMethod = "true" ;
 }
else{
    validateMethod = "false";
}

context.setVariable('validateMethod' , validateMethod);