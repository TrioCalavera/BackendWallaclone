const fs = require('fs/promises');
const handlebars = require('handlebars');
function isAPIRequest(req){
    return req.originalUrl.startsWith('/api/')
  }

async function readHTMLFile(data) {
    var html = await fs.readFile('mailtemplates/offer.html', {encoding: 'utf-8'});
    
    var template = handlebars.compile(html);
    var replacements = {
      username: data.username,
      useroffer: data.useroffer,
      message: data.message,
      productname: data.advert,
    };
    var htmlToSend = template(replacements);
    return htmlToSend;
};

module.exports={
  isAPIRequest,
  readHTMLFile,
}