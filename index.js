const cheerio = require('cheerio');
const fs = require('fs');
const file = fs.readFileSync('./test-site/index.html','utf8');
const $ = cheerio.load(file);

var sites = [];

$('a').each(function() {
  sites.push($(this).attr('href'))
})

console.log(sites);
