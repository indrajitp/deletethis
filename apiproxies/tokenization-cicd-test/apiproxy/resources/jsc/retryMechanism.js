var mid = context.getVariable("mid");
var pan = context.getVariable("private.pan");
var modTenChk = context.getVariable("modTenCheck");
var path = context.getVariable("proxy.pathsuffix");
var token = context.getVariable("token");
var centralServer = "https://gptokenizationcentral-dev.globalpay.com";
var eastServer = "https://gptokenizationeast-dev.globalpay.com";
var healthMonitorURI = "/static/swaggerUI/dist/index.html";
var count = 0;
var flag = true;
var uri;
var myRequest;
var exchangeObj;
var eastHealthCheckURL = new Request();
var centralHealthCheckURL = new Request();
centralHealthCheckURL.url = centralServer + healthMonitorURI;
eastHealthCheckURL.url = centralServer + healthMonitorURI;
var header = {
	'Content-Type' : 'application/x-www-form-urlencoded'
};
var detokenizeBasePath = "/api/detokenize";
var basepath = "/api/TokenizeData";
function toCheckFlow(serverName) {
	if (path == "/merchant/number") {

		url = serverName+basepath+"?format=json&PAN=" + pan + "&MID=" + mid
				+ "&isGTRequired=false&isModTenRequired=" + modTenChk
				+ "&token=" + token;
		print("************url****************"+url);
		//centralServer = centralServer + basepath + uri;
		myRequest = new Request(url, 'POST', header);
		exchangeObj = httpClient.send(myRequest);
		//exchangeObj.waitForComplete(1);
		
		if(!exchangeObj.isError()){
		var op = exchangeObj.getResponse().content.asJSON;
		print("Final" + JSON.stringify(op));
		}
		
		return exchangeObj.isError();
	} else if (path == "/number") {
		url = serverName + basepath+"?format=json&PAN=" + pan + "&MID=" + mid
				+ "&isGTRequired=true&isModTenRequired=" + modTenChk
				+ "&token=" + token;
		myRequest = new Request(url, 'POST', header);
		exchangeObj = httpClient.send(myRequest);
		exchangeObj.waitForComplete(1);
		
		print("TTTTTTT" + exchangeObj.isError());
		var op1 = exchangeObj.getResponse().content.asJSON;
		print("Final" + JSON.stringify(op1));
		
		return exchangeObj.isError();
	} else if (path == "/token") {

		url = serverName + detokenizeBasePath+"?format=json&&token=" + token + "&TOKEN_NUM=" + tnumber;
		myRequest = new Request(url, 'POST', header);
		exchangeObj = httpClient.send(myRequest);
		exchangeObj.waitForComplete(1);
		
		print("TTTTTTT" + exchangeObj.isError());
		var op2 = exchangeObj.getResponse().content.asJSON;
		print("Final" + JSON.stringify(op2));
		
		return exchangeObj.isError();
	}
}

while (count < 5) {
	print("*****************************************");
	count++;
	print("Count" + count);
	if (flag) {
		if (!httpClient.send(centralHealthCheckURL).isError()) {
			print("*********Central*****true******");
			if(!toCheckFlow(centralServer)){
				break;
			}
		} else if (!httpClient.send(eastHealthCheckURL).isError()) {
			print("*********East******true*****");
			if(!toCheckFlow(eastServer)){
				break;
			}	
		}
		flag = false;
	}else {
		if (!httpClient.send(eastHealthCheckURL).isError()) {
			print("*********East******false*****");
			if(!toCheckFlow(eastServer)){
				break;
			}
		} else if (!httpClient.send(centralHealthCheckURL).isError()) {
			print("*********Central******false*****");
			if(!toCheckFlow(centralServer)){
				break;
			}
		}
		flag = true;
	}
}