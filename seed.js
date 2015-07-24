var mongoose = require('mongoose'),
    Word     = require('./models/word.js');

mongoose.connect('mongodb://localhost:27017/verbing')

var db = mongoose.connection;

db.on('error', function (err) {
  console.log(err);
});

db.once('open', function () {
  var verbs = ["running", "eating", "sleeping"];

  verbs.forEach(function (verb) {
    Word.findOne({
      content: verb,
      wordType: "verb"
    }, function (err, word) {
      if (!word) {
        Word.create({
          content: verb,
          wordType: "verb"
        });
      };
    });
  });
})
