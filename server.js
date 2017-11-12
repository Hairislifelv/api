var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

// Modles
var Products = require('./app/models/products');

// mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });
// app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('HAIRISLIFELV API');
});

app.get('/products', function (req, res) {
  Products.find(req.query).exec((err, products) => {
    if (err) throw err;

    res.send({products});
  });
});

app.post('/products', function (req, res) {
  Products.findOneAndUpdate({
    name: req.body.name
  }, req.body, {
    upsert: true
  },function(err, product) {
    if (err) throw err;

    res.send(product);
  });
});

app.listen(3004);
