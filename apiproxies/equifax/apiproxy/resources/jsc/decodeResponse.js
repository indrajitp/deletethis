
var htmlescape = htmlEscape(context.getVariable('response.content'));
//var htmlunescape = context.setVariable('inputs.customer',htmlEscape(context.getVariable('response.content')));
var lines = htmlescape.split('\n');
lines.splice(0,1);

// join the array back into a single string
var newres = lines.join('\n');

var res = newres.replace('<string xmlns="https://www.Equifax.ca/EFXWS/STSRequest">', "").replace("</string>", "");
var newres = res.substring(0, res.indexOf("</EfxTransmit>") + "</EfxTransmit>".length);

//var string = newtext;
//string.removeWord('<string xmlns="https://www.Equifax.ca/EFXWS/STSRequest">');

//print("htmlescape &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& : "+str2);
context.setVariable('response.content',newres);
context.setVariable('response.header.Content-Type', "text/xml");


//String.prototype.removeWord = function(searchWord){
//    var str = this;
//    var n = str.search(searchWord);
//    while(str.search(searchWord) > -1){
//        n = str.search(searchWord);
//        str = str.substring(0, n) + str.substring(n + searchTerm.length, str.length);
//    }
//    return str;
//}

//Using above method
//var string = "Today is is Monday";
 // Returns: Today is Monday
//print("htmlunescape: "+htmlunescape);
function htmlUnescape(value){
    return String(value)
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
}

function htmlEscape(str) {
    return String(str)
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
}
