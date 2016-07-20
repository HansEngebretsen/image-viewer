var express = require('express');
var router = express.Router();
var cheerio = require('cheerio'); // jquery for node
var fs = require('fs'); // file system
var express = require('express');
var refreshme = true; // caching
var phantom = require('phantom');

var getData = require('../modules/getdata.js');
// var outputData = require('../modules/outputdata.js');





/* GET home page. */
router.get('/', function(req, res, next) {
  // Do we need to refresh?
  var modDate = fs.statSync('output.json').mtime,
      now = new Date(),
      timeout = 60*1*1000;

  var bracketData;
  function outputData(callback){
    fs.readFile('output.json', 'utf8', function(err, data){
      if (err) return callback(err);
      var newData = JSON.parse(data);
      return callback(newData);
    });
  }


  function setData(callback){
    if ((now - modDate) > timeout && refreshme){ // If we need to refresh things
      console.log('refresh');
      new getData(); // Go get em
      refreshme = false;
      outputData(function parseData(data){
        bracketData = data;
        return callback(bracketData); // Return our Data
      });
    }else {
      // res.send('nothing to refreshs');
      // res.send(json.bracket);
      outputData(function parseData(data){ // When we've got the data
        bracketData = data;
        return callback(bracketData); // Return our Data
      });
      console.log(bracketData);
      console.log('nothing to refresh');
    }

  }

  setData(function renderPage(bracketData){ // Lets render this bad boy
    // console.log(bracketData);
    res.render('index', {
      title: 'mini DAM',
      rs: require('fs'),
      data: bracketData
    });
  });




});

module.exports = router;
