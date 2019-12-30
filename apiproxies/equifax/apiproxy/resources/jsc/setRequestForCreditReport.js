 // Set Request for Credit Report
 var xmlRequest= context.getVariable("xmlvar") + context.getVariable("request.content");
 context.setVariable("request.content", xmlRequest);
 