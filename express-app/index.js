const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const request = require('request');
const Mattermost = require('node-mattermost');

var mattermost = new Mattermost('dgyfitnqzfnwicg1uzhp3fcqcr');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  
  console.log('request = ', req);
  console.log('request body = ', req.body.user_name);
  var inputParam = req.body.text;
  if(inputParam == '') inputParam = "viet";

  var searchObj = {
	  "vietnamese": ["gai+dep", "VietNamese Teen Girls", "gai+xinh", "girl+xinh"],
	  "chinese": ["chinese beautiful girl", "chinese beautiful girl"],
	  "other": ["beautiful+girl"]
  }

  //var searchObj = JSON.parse(searchJson);
  var searchParam = '';
  var searchPage = 1;
  
  switch(inputParam) {
    case "viet":
    {
      searchParam = searchObj.vietnamese[Math.floor((Math.random() * searchObj.vietnamese.length ))];
      searchPage = Math.floor((Math.random() * 100 ) + 1);
    }
    break;
    case "tau":
    {
      searchParam = searchObj.chinese[Math.floor((Math.random() * searchObj.chinese.length ))];
      searchPage = Math.floor((Math.random() * 50 ) + 1);
    }
    break;
    case "tay":
    {
      searchParam = searchObj.other[Math.floor((Math.random() * searchObj.other.length ))];
      searchPage = Math.floor((Math.random() * 1000 ) + 1);     
    }
    break;
    case "help":
    {
      res.json({
        response_type: "in_channel",
        text: "Use /gai viet to find vietnamese, use /gai tau to find chinese, use /gai tay to find tay, or just /gai waifu to find watever u want",
        username: 'CojXuong'
      });
    }
    break;
    default:
    {
      res.json({
        response_type: "in_channel",
        text: "Too many people don't use me to looking for a girl picture, so i will not serve you this time as punishment",
        username: 'CojXuong'
      });
    }
    break;
  }

  console.log('searchParam = ', searchParam);
  console.log('searchPage = ', searchPage);
  
  console.log(searchPage);

  request.get({
      url: 'https://api.flickr.com/services/rest',
      qs: {
        method: 'flickr.photos.search',
        api_key: 'a2f198d8d33710fa85c8e8df61ab6516',
        text: searchParam,
        // user_id: 'dadabayxa',
        // sort: 'interestingness-desc',
        content_type: 1,
        extras: 'url_m',
        page: searchPage,
        format: 'json',
        nojsoncallback: 1        
      }
    }
    , function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body);
        
        var myObj = JSON.parse(body);
		
		    var textResult = '@' + req.body.user_name + ' : please calm!';

        var jsonRes = {
          response_type: "in_channel",
          text: textResult,
          username: 'CojXuong'
        }

        if(req.body.channel_id == 'n65qn8ytrt88pq58xxm5b3dk3c' || req.body.user_name == 'diep.trantuan') {
          if(myObj.photos.photo.length > 0) {
            if(myObj.photos.photo.length > 1)
              randomNumber = Math.floor((Math.random() * (myObj.photos.photo.length) ) + 1);
            else
              randomNumber = 0;
            //jsonRes.text = '@' + req.body.user_name + " want: **_" + inputParam + "_**" + " " + myObj.photos.photo[randomNumber].url_m;
            jsonRes.text = 'A gift from @' + req.body.user_name + ": " + myObj.photos.photo[randomNumber].url_m;
          }
          else {
            jsonRes.text = 'Sorry @' + req.body.user_name + ' i can not find image';
          }
        }
        
        if( req.body.user_name == 'phuong.nguyenvan2' && (Math.floor(Math.random() * 3 + 1) == 3) ) {
          jsonRes.text = 'To @' + req.body.user_name + ' I will always be the newest one, and better one. My old one should be sacrifice for that.';
        }

        res.json(jsonRes);        
    })

});

module.exports.handler = serverless(app);