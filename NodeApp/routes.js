var request = require('request');

module.exports = function(app) {

    app.get('/testing', function(req, res) {
        console.log('testing');
    })

    app.get('/api/stories', function(req, res) {
        request('https://api.iextrading.com/1.0/stock/market/news/last/10', { json: true }, function (error, response, body) {
             console.log('body:', body); 
            
             res.jsonp(body);
           }) 
        })

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
};