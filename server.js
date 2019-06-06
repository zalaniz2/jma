

const express = require('express'); //load express
var MongoClient = require('mongodb').MongoClient; //mongodb
var bodyParser = require('body-parser');
const app = express();
var router = express.Router(); //middle layer router
var path = __dirname + '/client/views/'; //path to html pages
var url = "mongodb://localhost:27017/jazz"; //url to access local db

app.use(bodyParser.json()); //parsing JSON from AJAX request


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

     if(err) throw err;

     else{
       console.log("Successfuly connected to Jazz DB.");
     }

     app.locals.db = db.db("jazz"); //open connection to DB.


});

//==================================================================================================

router.use(function (req,res,next) {
  console.log("/" + req.method); //show what type of request is coming in, move to next requests
  next();
});

router.get('/', function (req, res) { //root (index page)
  res.sendFile(path + "index.html");
});


router.post('/chords', function(req, res){

  console.log(req.body); //parsed JSON data

  app.locals.db.collection("seventh").findOne({}, function(err, response) {

    if (err) throw err;


    if( req.body.type == "ex1" ){

        console.log("Getting major 7th chords from DB.");
        console.log(response.major);
        res.send(response.major);

    }

    else if( req.body.type == "ex2"){
      console.log("Getting Dominant 7th chords from DB.");
      console.log(response.dominant);
      res.send(response.dominant);
    }
    else if( req.body.type == "ex3"){
      console.log("Getting Minor 7th chords from DB.");
      console.log(response.minor);
      res.send(response.minor);
    }

  });

});

router.post('/tones', function(req, res){

  app.locals.db.collection("tones").findOne({}, function(err, response) {

    if (err) throw err;

    console.log(response);

    res.send(response.tones);

  });

});

router.post('/scales', function(req, res){

  app.locals.db.collection("scales").findOne({}, function(err, response) {

    if (err) throw err;

    console.log(response);

    res.send(response.blues);

  });

});

router.post('/standard', function(req, res){

  app.locals.db.collection("standards").findOne({}, function(err, response) {

    if (err) throw err;

    console.log(response);

    res.send(response.autumnleaves);

  });

});


//==================================================================================================


app.use('/client', express.static(__dirname + '/client')); //static files
app.use("/",router); //use router

//============================================================
app.listen(3000, function () { //listen on port 3000
  console.log('Application listening on port 3000.');
});
//=============================================================
