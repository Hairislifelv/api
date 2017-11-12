var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

module.exports = mongoose.model('Products', new Schema({
  name: String,
  price: String,
  description: String
}));
