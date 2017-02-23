var fs = require('fs');

module.exports.createJson = function(hashtag, Twitter) {
    return function(req, res) {  
    Twitter.stream('statuses/filter', {
        track: hashtag
    });
    // console.log("hello");
    Twitter.pipe(fs.createWriteStream('tweets/tweets.json'));
        res.render('index', { title: 'Express' });
    }
}





