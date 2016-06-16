var mongoose = require('mongoose');

//Customer Schema
var customerSchema = mongoose.Schema({
  'prtg-version': {
    type: String
  },
  'treesize': {
    type: Number
  },
  'sensors': {
    type: Array
  }
});

var Customer = module.exports = mongoose.model('Customer', customerSchema);

//Get Customers
module.exports.getCustomers = function(callback, limit) {
  Customer.find(callback).limit(limit);
};

//Update Customer
module.exports.updateCustomer = function(id, customer, options, callback) {
  var query = {_id: id};
  var update = {
    'prtg-version': customer['prtg-version'],
    'treesize': customer.treesize,
    'groups': customer.groups
  };
  Customer.update(query, update, options, callback);
};