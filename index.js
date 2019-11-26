const cheerio = require('cheerio'),
      fs = require('fs'),
      file = fs.readFileSync('./test-site/index.html','utf8'),
      $ = cheerio.load(file),
      phpReq = require('php-request-generator');

const api = {
  url:"./server.php",
  active:"a",
  hover:"h"
};

const requests = {
  name: "requests",
  allRequests: true,
  get: [api.active,api.hover]
}

phpReq(requests);


var sites = [];

var CSS=`/* CSS Link Tracking */\na[href]:active::after{width:0;height:0}`;

$('a').each(function() {
  sites.push($(this).attr('href'))
})

for (var i = 0; i < sites.length; i++) {
  CSS+=`a[href="${sites[i]}"]:active::after{content:url(${api.url}?${api.active}=${sites[i]})}`;
}

console.log(sites);
fs.writeFileSync("test.css",CSS);
