const cheerio = require('cheerio');
const fs = require('fs');
const file = fs.readFileSync('./test-site/index.html','utf8');
const $ = cheerio.load(file);

const api = {
  url:"./anylitics.php",
  active:"a",
  hover:"h"
};

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
