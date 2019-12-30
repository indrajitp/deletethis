var Test = context.targetRequest.body.asJSON;
var MessageCategory = context.getVariable("MessageCategory");
var MessageContent  = context.getVariable("MessageContent");
var Resource = context.getVariable("Resource");

//test.MessageCategory = MessageCategory;
//print('S : ' + Test);
//var s = JSON.parse(Test);
//var s = Test.messageContent;
delete Test["messageContent"];
delete Test["messageCategory"];
Test.messageType = MessageCategory;
Test.message = MessageContent;

print('abc : ' + JSON.stringify(Test));
//context.setVariable('t1',Test)

//var obj = {"message" :MessageCategory , "messageType" : MessageContent}



//var s = JSON.stringify(obj)

//print ('ndfjnvjnnj:' + s);
context.setVariable("request.content",Test);
