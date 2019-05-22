

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

     /*

     var data = [
       {
         "major": [
           {  "name": "Cmaj7", "formula": [60, 64, 67, 71] },
           {  "name": "Bbmaj7", "formula": [58, 62, 65, 69] },
           {  "name": "Ebmaj7", "formula": [63, 67, 70, 74] },
           {  "name": "Abmaj7", "formula": [56, 60, 63, 67] },
           {  "name": "Dbmaj7/C#maj7", "formula": [61, 65, 68, 72] },
           {  "name": "Gbmaj7/F#maj7",  "formula": [54, 58, 61, 65]},
           {  "name": "Bmaj7",  "formula":  [59, 63, 66, 70]},
           {  "name": "Emaj7", "formula": [64, 68, 71, 75]},
           {  "name": "Amaj7", "formula": [57, 61, 64, 68]},
           {  "name": "Dmaj7",  "formula":  [62, 66, 69, 73]},
           {  "name": "Gmaj7",  "formula":  [55, 59, 62, 66]}
         ],
         "dominant": [
           {  "name": "C7", "formula": [60, 64, 67, 70] },
           {  "name": "Bb7", "formula": [58, 62, 65, 68] },
           {  "name": "Eb7", "formula": [63, 67, 70, 73] },
           {  "name": "Ab7", "formula": [56, 60, 63, 66] },
           {  "name": "Db7/C#7", "formula": [61, 65, 68, 71] },
           {  "name": "Gb7/F#7",  "formula": [54, 58, 61, 64]},
           {  "name": "B7",  "formula":  [59, 63, 66, 69]},
           {  "name": "E7", "formula": [64, 68, 71, 74]},
           {  "name": "A7", "formula": [57, 61, 64, 67]},
           {  "name": "D7",  "formula":  [62, 66, 69, 72]},
           {  "name": "G7",  "formula":  [55, 59, 62, 65]}
         ],
         "minor": [
           {  "name": "Cm7", "formula": [60, 63, 67, 70] },
           {  "name": "Bbm7", "formula": [58, 61, 65, 68] },
           {  "name": "Ebm7", "formula": [63, 66, 70, 73] },
           {  "name": "Abm7", "formula": [56, 59, 63, 66] },
           {  "name": "Dbm7/C#m7", "formula": [61, 64, 68, 71] },
           {  "name": "Gbm7/F#m7",  "formula": [54, 57, 61, 64]},
           {  "name": "Bm7",  "formula":  [59, 62, 66, 69]},
           {  "name": "Em7", "formula": [64, 67, 71, 74]},
           {  "name": "Am7", "formula": [57, 60, 64, 67]},
           {  "name": "Dm7",  "formula":  [62, 65, 69, 72]},
           {  "name": "Gm7",  "formula":  [55, 58, 62, 65]}
         ]
       }
     ];
*/

/*
     dbc.collection("chords").find({}).toArray(function(err, res) {
       if (err) throw err;
       console.log(res);
       db.close();
     });


     dbc.collection("chords").insertMany(data, function(err, res){
      if(err) throw err;
      console.log(res);
      db.close()
   })
   */

/*
     dbc.collection("seventh").insertMany(data, function(err, res){
      if(err) throw err;
      console.log(res);
      db.close();
   });
   */

/*
});

*/

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


    if( req.body.type == 1 ){

        console.log("Getting major 7th chords from DB.");
        console.log(response.major);
        res.send(response.major);

    }

    else if( req.body.type == 2){
      console.log("Getting Dominant 7th chords from DB.");
      console.log(response.dominant);
      res.send(response.dominant);
    }
    else{
      console.log("Getting Minor 7th chords from DB.");
      console.log(response.minor);
      res.send(response.minor);
    }

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
