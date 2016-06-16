var mongoose  = require('mongoose');
var db        = mongoose.connection;

//Run Schema
var groupSchema = mongoose.Schema({
  'objid': {
    type: Number
  },
  'probe': {
    type: String
  },
  'probe_raw': {
    type: String
  },
  'group': {
    type: String
  },
  'name': {
    type: String
  },
  'downsens': {
    type: String
  },
  'downsens_raw': {
    type: Number
  },
  'partialdownsens': {
    type: String
  },
  'partialdownsens_raw': {
    type: Number
  },
  'downacksens': {
    type: String
  },
  'downacksens_raw': {
    type: Number
  },
  'upsens': {
    type: String
  },
  'upsens_raw': {
    type: Number
  },
  'warnsens': {
    type: String
  },
  'warnsens_raw': {
    type: Number
  },
  'pausedsens': {
    type: String
  },
  'pausedsens_raw': {
    type: Number
  },
  'unusualsens': {
    type: String
  },
  'unusualsens_raw': {
    type: Number
  },
  'undefinedsens': {
    type: String
  },
  'undefinedsens_raw': {
    type: Number
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

//Add Group
module.exports.addGroup = function(group, callback) {
  var add = {
    'objid'               : group.objid,
    'probe'               : group.probe,
    'probe_raw'           : group.probe_raw,
    'group'               : group.group,
    'name'                : group.name,
    'downsens'            : group.downsens,
    'downsens_raw'        : group.downsens_raw,
    'partialdownsens'     : group.partialdownsens,
    'partialdownsens_raw' : group.partialdownsens_raw,
    'downacksens'         : group.partialdownsens_raw,
    'downacksens_raw'     : group.downacksens_raw,
    'upsens'              : group.upsens,
    'upsens_raw'          : group.upsens_raw,
    'warnsens'            : group.warnsens,
    'warnsens_raw'        : group.warnsens_raw,
    'pausedsens'          : group.pausedsens,
    'pausedsens_raw'      : group.pausedsens_raw,
    'unusualsens'         : group.unusualsens,
    'unusualsens_raw'     : group.unusualsens_raw,
    'undefinedsens'       : group.undefinedsens,
    'undefinedsens_raw'   : group.undefinedsens_raw
  };
  Group.create(add, callback);
};

//Drop Group
module.exports.dropGroup = function() {
  mongoose.connection.db.dropCollection('groups', function(err, result) {
    console.log('dropped');
  });
};