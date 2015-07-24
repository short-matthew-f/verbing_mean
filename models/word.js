/* Model: Word */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wordSchema = Schema({
  content: String,
  wordType: String
});

wordSchema.statics.sample = function (wordType, num, callback) {
  var _Word = this;

  this.count({
    wordType: wordType
  }, function (err, count) {
    console.log("Total words:", count);

    if (num >= count) {
      _Word.find({
        wordType: wordType
      }, function (err, words) {
        callback(words);
      });
    } else {
      var skips = [];
      while (skips.length < num) {
        var nextSkip = Math.floor(Math.random() * count);
        while (skips.indexOf(nextSkip) > -1) {
          nextSkip = Math.floor(Math.random() * count);
        }
        skips.push(nextSkip);
      };
      console.log("Skips:", skips);

      var words = [];
      skips.forEach(function (skip) {
        _Word.findOne({
          wordType: wordType
        }).skip(skip)
          .then(function (word) {
            console.log("Word is", word);
            words.push(word);

            if (words.length === num) {
              console.log("ENOUGH WORDS!");
              callback(words);
            }
          });
      });
    };
  });
};

module.exports = mongoose.model('Word', wordSchema);
