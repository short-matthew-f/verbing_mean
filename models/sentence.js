var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Word     = require('./word.js');

var sentenceSchema = Schema({
  verb: Word,
  adjective: Word,
  noun: Word
});

module.exports = mongoose.model('Word', wordSchema);
