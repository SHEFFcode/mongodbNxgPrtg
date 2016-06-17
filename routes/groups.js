var express   = require('express');
var router    = express.Router();
var Group     = require('../models/groups');
var request   = require('request');

//Get all Groups
router.get('/group', function (req, res) {
  Group.getGroups(function (err, runners) {
    if (err) {
      res.send(err);
    } else {
      res.json(runners);
    }
  });
});

//Get one group by id
router.get('/group/:id', function (req, res) {
  Group.getRunById(req.params.id, function (err, runner) {
    if (err) {
      res.send(err);
    } else {
      res.json(runner);
    }
  });
});

router.post('/group', function (req, res) {
  request.get("https://prtg.paessler.com/api/table.json?content=groups&output=json&columns=objid,probe,group,name,downsens,partialdownsens,downacksens,upsens,warnsens,pausedsens,unusualsens,undefinedsens&start=10000&username=demo&password=demodemo", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      Group.dropGroup();
      var run = JSON.parse(body);
      var runner = run.groups;
      runner.map(function (i) {
        if (i.group === 'Paessler Servers via Cologne') {
          Group.addGroup(i, function () {
            console.log('saved');
          });
        }
      });
    }
  });
  res.sendStatus(200);
});


module.exports = router;