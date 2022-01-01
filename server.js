'use strict';

// Dependencies
let express         = require('express');
let app             = express();
let cookieParser    = require('cookie-parser');
let bodyParser      = require('body-parser');
let methodOverride  = require('method-override');
let redis           = require('redis');
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
(async () => {
  const client = redis.createClient();

  client.on('error', (err) => {
    console.log(`Redis client error: ${err}`);
  });

  await client.connect();

  app.get('/api/keys/list', (req, res) => {
    client.keys('*', (err, reply) => {
      res.send(reply);
    });
  });

  app.get('/api/keys/:keyId', (req, res) => {
    client.get(req.params.keyId, (err, reply) => {
      res.send(reply);
    });
  });

  app.post('api/keys', (req, res) => {
    client.set(req.body.keyId, (err, reply) => {
      res.send(`Key ${req.body.keyId} created`);
    });
  });

  app.get('/api/keys/delete/:keyId', (req, res) => {
    client.del(req.params.keyId, (err, reply) => {
      res.send(`Key ${req.params.keyId} deleted`);
    });
  });
})();


// Application start
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
