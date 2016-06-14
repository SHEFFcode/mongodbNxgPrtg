var mongoose = require('mongoose');

//Run Schema
var groupSchema = mongoose.Schema({
  'group_id': {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  'prtg-version': {
    type: String
  },
  'treesize': {
    type: String
  },
  'groups': {
    type: Array
  }
});

var Group = module.exports = mongoose.model('Group', groupSchema);

//Get Runs
module.exports.getGroups = function(callback, limit) {
  Group.find(callback).limit(limit);
};

//Get GroupById
module.exports.getRunById = function(id, callback) {
  Group.findById(id, callback);
};

//Update Group
module.exports.updateGroup = function(id, group, options, callback) {
  var query = {_id: id};
  var update = {
    'group_id': group.group_id,
    'prtg-version': group['prtg-version'],
    'treesize': group.treesize,
    'groups': group.groups
  };
  var options = {
    upsert: true
  };
  Group.update(query, update, options, callback);
};

//Add Run
module.exports.addGroup = function(group, callback) {
  var add = {
    'group_id': group.group_id,
    'prtg-version': group['prtg-version'],
    'treesize': group.treesize,
    'groups': group.groups
  };
  Group.create(add, callback);
};