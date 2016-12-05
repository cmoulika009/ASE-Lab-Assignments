var request = require('request');
request('https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=india&return=enriched.url.url,enriched.url.title&apikey=cf7f952e90bc0a012fffed7a30bfde51c88edf2a', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
//	console.log(body);
    //All is good. Print the body
    body = JSON.parse(body);
    var ven = body.response.title;
    var i;
    for(i=0;i<ven.length;i++)
    {
        console.log(ven[i].title);
    }

});