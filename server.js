var express     = require('express');
var app         = express();
var PORT        = process.env.PORT || 3000;
var request     = require('request');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var Group       = require('./models/groups.js');
var groups      = require('./routes/groups');

//Mongoose Connection
mongoose.connect('mongodb://localhost:27017/nxg-prtg');
var db = mongoose.connection;

//Middleware
app.use(bodyParser.json());
app.use('/api/groups', groups);

//Groups route
app.get('/groups', function (req, res, next) {
  console.log('Received a status, working on it');
  request.get("/api/table.json?content=groups&output=json&columns=objid,probe,group,name,downsens,partialdownsens,downacksens,upsens,warnsens,pausedsens,unusualsens,undefinedsens&start=10000&username=demo&password=demodemo", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data.groups);
      res.send(data.groups); // Print the json.
    }
  });
});

app.listen(PORT, function () {
  console.log('listening on port ' + PORT);
});