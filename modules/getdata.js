var phantom = require('phantom'), // getting the html
     cheerio = require('cheerio'), // jquery for node
     fs = require('fs'), // file system
     express = require('express');

var getData = function(){

  // Function for recursive file reading
  var json = [];
  var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

  function filterJpg(input){
    return input.includes(".jpg");
  }

json = [];

  walk('public/assets', function(err, results) {
    if (err) throw err;
    var images = results.filter(filterJpg);
    for (var i = 0; i < images.length; i++){

      var thumbUrl = images[i].replace('public/', ''),
          name     = thumbUrl.replace('.jpg', ''),
          imageUrl = thumbUrl.replace('.jpg', '.psd');
      json.push({
        name: name,
        thumbUrl: encodeURI(thumbUrl),
        imageUrl: encodeURI(imageUrl),
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
    })
  });



}
// var getData = function(){
//   console.log('ran');
//   url = 'http://games.espn.go.com/tournament-challenge-bracket/2016/en/group?groupID=1316419';
//   phantom.create().then(function(ph) {
//     ph.createPage().then(function(page) {
//       page.open(url).then(function(status) {
//         console.log(status);
//            setTimeout(function() { // give it some time to load
//             page.property('content').then(function(content) {
//               // console.log(content);
//               var $ = cheerio.load(content),
//                       data = content,
//                       json = [];

//               $('.type_entries').filter(function(){
//                 var row = $(this).children('tbody').children('tr');

//                     row.each(function(i){
//                       var self = $(this),
//                           rank = self.children('.rank').text().replace('*', ''),
//                           bracket = self.find('.entry').text(),
//                           person = self.find('.profileLink').text(),
//                           percent = self.find('.percentile').text(),
//                           image;

//                           if(!i == 0){
//                             percent = Math.round(parseInt(percent));
//                           }
//                           // Normalize Names
//                           if (person == "beuler32"){
//                             person = "Euler";
//                             image = "euler";
//                           } else if (person == "w_thrasher") {
//                             person = "Thrasher";
//                             image = "thrasher";
//                           } else if (person == "espn25423297"){
//                             person = "Hans";
//                             image = "hans";
//                           } else if (person == "derenzomd"){
//                             person = "De Renzo";
//                             image = "derenzo";
//                           } else if (person == "paul.werkema"){
//                             person = "Werkema";
//                             image = "werkema";
//                           }
//                       json.push({
//                         bracketName: bracket,
//                         rank: rank,
//                         person: person,
//                         image: image,
//                         percent: percent
//                       })
//                     });
//               });
//               fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//                   console.log('File successfully written! - Check your project directory for the output.json file');
//               })
//               // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//               // res.send('Check your console!');
//               page.close();
//               ph.exit();
//             });
//            }, 2000);
//       });
//     });
//   });
// };

module.exports = getData;
