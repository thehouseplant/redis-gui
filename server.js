'use strict';

// Dependencies
let express         = require('express');
let app             = express();
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let methodOverride  = require('method-override');
let redis           = require('redis');
let client          = redis.createClient({host: 'localhost', port: 6379});
let port            = 3000;


// Server configuration
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());


// Redis configuration
client.on('error', function(err) {
    console.log(`Error: ${err}`);
});

app.get('/api/keys/list', function(req, res) {
    client.keys('*', function(err, reply) {
        res.send(reply);
    });
});

app.get('/api/keys/get/:keyId', function(req, res) {
    client.get(req.params.keyId, function(err, reply) {
        res.send(reply);
    });
});

app.post('/api/keys/create', function(req, res) {
    client.set(req.body.keyId, req.body.keyValue, function(err, reply) {
        res.send('Key created');
    });
});

app.get('/api/keys/delete/:keyId', function(req, res) {
    client.del(req.params.keyId, function(err, reply) {
        res.send(`Key ${req.params.keyId} deleted`);
    });
});


// Application start
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});
