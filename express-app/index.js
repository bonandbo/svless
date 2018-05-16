const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const request = require('request');
const Mattermost = require('node-mattermost');

// var mattermost = new Mattermost('yydiwu9g9t8efkunnw8jnk3fbo');
var mattermost = new Mattermost('w5qjea1yxpgd5cmg56c7tzg13r');

app.use(bodyParser.json({ strict: false }));

// function replyMattermost(body, textRep) {
//   var responseOutgoing = {
//     text: textRep,
//     username: 'CojXuong'
//   };
//   return responseOutgoing;
// }

app.post('/', function (req, res) {
  
  console.log(req);

  // var resRep = 'diep testdiep test';
  // var replyResult = 'diep test';

  request.get({
      url: 'https://api.flickr.com/services/rest',
      qs: {
        method: 'flickr.photos.search',
        api_key: 'a2f198d8d33710fa85c8e8df61ab6516',
        text: 'gai+xinh',
        sort: 'interestingness-desc',
        content_type: 1,
        extras: 'url_m',
        page: Math.floor((Math.random() * 10 ) + 1),
        format: 'json',
        nojsoncallback: 1        
      }
    }
    , function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        
        var myObj = JSON.parse(body);

        randomNumber = Math.floor((Math.random() * 9 ) + 1);

        var test1 = {
          response_type: "in_channel",
          text: myObj.photos.photo[randomNumber].url_m,
          username: 'CojXuong'
        }

        res.json(test1);
  })

});

module.exports.handler = serverless(app);