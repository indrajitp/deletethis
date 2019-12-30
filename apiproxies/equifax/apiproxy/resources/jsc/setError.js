var fault = context.getVariable("fault.name");
 
 if (fault!== null){
 
   context.setVariable("flow.error.status", context.getVariable("message.status.code"));
   context.setVariable("flow.error.reason", fault );
   context.setVariable("flow.error.message", fault);
   context.setVariable("flow.log.severity", "Error");
 
 }