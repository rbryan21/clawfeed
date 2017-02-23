var express = require('express');
var router = express.Router();

var tweetsCtrl = require('../app/controllers/tweets.js');
var twitterStream = require('twitter-stream-api');
var fs = require('fs');

var keys = {
  consumer_key : "7EHH72iYX8COvNa0KLI8KNm9Y",
  consumer_secret : "CZzrDCBnnBV3goyG55eLLR2qBOKwXUO7W7yBCKMpwIjfAo1kQV",
  token : "50436093-G1bf8QjaDDeAodjMiB57W656jEqSrRTSRN1nUCSrV",
  token_secret : "Cv8tcx076b2Iam3nQdUCpejQQuQ0WmEdomp7EnCZSLnEl"
}
 
var Twitter = new twitterStream(keys, false);

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
}); 

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});
  
router.get('/test', tweetsCtrl.createJson('tacos', Twitter));
router.get('/stoptest', function(req, res) { Twitter.close(); res.redirect('/'); });


/* GET home page. */
router.get('/', function(req, res, next) {
  Twitter.close();
  res.render('index', { title: 'Express' });
});



module.exports = router;
