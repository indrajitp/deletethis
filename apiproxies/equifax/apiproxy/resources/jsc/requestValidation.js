//Preparing request based on the request content and flow(Credit Report)
 var jsonRequest = JSON.parse(context.getVariable("request.content"));
 var xmlvar = '<?xml version="1.0" encoding="utf-8"?>';
 context.setVariable("xmlvar",xmlvar);
 var contentType = context.getVariable("request.header.Content-Type");
 context.setVariable("contentType",contentType);
 var isCommercial = false;
 try{
	var cnRequests = jsonRequest.CNRequests;
if(cnRequests !== null && (!(cnRequests === undefined))){
var cnCustomerInfo = jsonRequest.CNCustomerInfo;
var customerCode = cnCustomerInfo.CustomerCode;
var customerNumber = cnCustomerInfo.CustomerInfo.CustomerNumber;
var securityCode = cnCustomerInfo.CustomerInfo.SecurityCode;
var customerId = cnCustomerInfo.CustomerId;
context.setVariable("customerCode",customerCode);
context.setVariable("customerNumber",customerNumber);
context.setVariable("securityCode",securityCode);
context.setVariable("customerId",customerId);
if(cnRequests.CNConsumerRequests)
{
	var subjects = cnRequests.CNConsumerRequests.CNConsumerRequest.Subjects;
var subject = subjects.Subject;
var subjectType = subjects.Subject.subjectType;
var lastName = subject.SubjectName.LastName;
var firstName = subject.SubjectName.FirstName;
var socialInsuranceNumber = subject.SocialInsuranceNumber;
var dateOfBirth = subject.DateOfBirth;
var occupation = subject.Occupation;
var address = subjects.Addresses.Address;
var civicNumber = address.CivicNumber;
var streetName = address.StreetName;
var city = address.City;
var province = address.Province;
var code = province.code;
var description = province.description;
var postalCode = address.PostalCode;
context.setVariable("subjectType",subjectType);
context.setVariable("lastName",lastName);
context.setVariable("firstName",firstName);
context.setVariable("socialInsuranceNumber",socialInsuranceNumber);
context.setVariable("dateOfBirth",dateOfBirth);
context.setVariable("occupation",occupation);
context.setVariable("civicNumber",civicNumber);
context.setVariable("streetName",streetName);
context.setVariable("city",city);
context.setVariable("code",code);
context.setVariable("description",description);
context.setVariable("postalCode",postalCode);
var customerReferenceNumber = cnRequests.CNConsumerRequests.CNConsumerRequest.CustomerReferenceNumber;
var ecoaInquiryType = cnRequests.CNConsumerRequests.CNConsumerRequest.ECOAInquiryType;
var jointAccessIndicator = cnRequests.CNConsumerRequests.CNConsumerRequest.JointAccessIndicator;
var language = cnRequests.CNOutputParameters.Language;
var outputParameterType = cnRequests.CNOutputParameters.OutputParameter.outputParameterType;
var genericOutputCode = cnRequests.CNOutputParameters.OutputParameter.GenericOutputCode;
context.setVariable("customerReferenceNumber",customerReferenceNumber);
context.setVariable("ecoaInquiryType",ecoaInquiryType);
context.setVariable("jointAccessIndicator",jointAccessIndicator);
context.setVariable("language",language);
context.setVariable("outputParameterType",outputParameterType);
context.setVariable("genericOutputCode",genericOutputCode);
}else if(cnRequests.CNCommercialRequest){
var firmName = cnRequests.CNCommercialRequest.FirmName;
var fileNumber = cnRequests.CNCommercialRequest.FileNumber;
var address = cnRequests.CNCommercialRequest.Addresses.Address;
var civicNumber = address.CivicNumber;
var streetName = address.StreetName;
var city = address.City;
var province = address.Province;
var code = province.code;
var postalCode = address.PostalCode;

var parsedTelephone = cnRequests.CNCommercialRequest.ParsedTelephones.ParsedTelephone;
//var parsedTelephone = parsedTelephones.ParsedTelephone;
var areaCode = parsedTelephone.AreaCode;
var phnumber = parsedTelephone.Number;
var extension = parsedTelephone.Extension;

context.setVariable("firmName",firmName);
context.setVariable("fileNumber",fileNumber);
context.setVariable("civicNumber",civicNumber);
context.setVariable("streetName",streetName);
context.setVariable("city",city);
context.setVariable("code",code);
context.setVariable("postalCode",postalCode);
context.setVariable("parsedTelephone",parsedTelephone);
context.setVariable("areaCode",areaCode);
context.setVariable("phnumber",phnumber);
context.setVariable("extension",extension);

var cnOutputParameters = cnRequests.CNOutputParameters;
var language = cnOutputParameters.Language;
var outputParameterType = cnOutputParameters.OutputParameter.outputParameterType;
var genericOutputCode = cnOutputParameters.OutputParameter.GenericOutputCode;
var customizationCode = cnOutputParameters.OutputParameter.CustomizationCode;

context.setVariable("language",language);
context.setVariable("outputParameterType",outputParameterType);
context.setVariable("genericOutputCode",genericOutputCode);
context.setVariable("customizationCode",customizationCode);
isCommercial = true;
}
context.setVariable("isCommercial",isCommercial);
context.setVariable("CreditReport","CreditReport");
}
}catch(err)
{
	throw err;
}

