var express   = require('express');
var router    = express.Router();
var Group     = require('../models/groups');
var request   = require('request');

//Get all Groups
router.get('/', function(req, res) {
  Group.getGroups(function(err, runners) {
    if (err) {
      res.send(err);
    } else {
      res.json(runners);
    }
  });
});

//Get one group by id
router.get('/:id', function(req, res) {
  Group.getRunById(req.params.id, function(err, runner) {
    if (err) {
      res.send(err);
    } else {
      res.json(runner);
    }
  });
});

router.post('/', function (req, res) {
  request.get("https://prtg.paessler.com/api/table.json?content=groups&output=json&columns=objid,probe,group,name,downsens,partialdownsens,downacksens,upsens,warnsens,pausedsens,unusualsens,undefinedsens&start=10000&username=demo&password=demodemo", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var runner = JSON.parse(body);
      Group.addGroup(runner, function(err, runner) {
        if (err) {
          res.send(err);
        } else {
          res.json(runner);
        }
      });
    }
  });
});


module.exports = router;