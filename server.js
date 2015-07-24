var express         = require('express'),
    server          = express(),
    ejs             = require('ejs'),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan')
    mongoose        = require('mongoose');

server.set('views', './views');
server.set('view engine', 'ejs');
server.use(express.static('./public'));

server.use(morgan('short'));

server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/verbing')

var db = mongoose.connection;

db.on('error', function (err) {
  console.log(err);
});

db.once('open', function () {
  console.log("BEEP BOOP: Database status: UP");
  server.listen(3000, function () {
    console.log("BEEP BOOP: Server status: UP");

    var Word = require('./models/word.js');

    Word.sample("verb", 2, function (verbs) {
      console.log("Here are some verbs", verbs);
    })
  })
})
