

const express = require('express'); //load express
var MongoClient = require('mongodb').MongoClient; //mongodb
var bodyParser = require('body-parser');
const app = express();
var router = express.Router(); //middle layer router
var path = __dirname + '/client/views/'; //path to html pages
var url = "mongodb://localhost:27017/jazz"; //url to access local db

app.use(bodyParser.json()); //parsing JSON from AJAX request


/*
var data = [
      {
        "tones": [
          {  "name": "C", "tones": [24, 36, 48, 60, 72, 84, 96] },
          {  "name": "Db", "tones": [25, 37, 49, 61, 73, 85, 97] },
          {  "name": "D", "tones": [26, 38, 50, 62, 74, 86, 98] },
          {  "name": "Eb", "tones": [27, 39, 51, 63, 75, 87, 99] },
          {  "name": "E", "tones": [28, 40, 52, 64, 76, 88, 100] },
          {  "name": "F",  "tones": [29, 41, 53, 65, 77, 89, 101]},
          {  "name": "Gb",  "tones":  [30, 42, 54, 66, 78, 90, 102]},
          {  "name": "G", "tones": [31, 43, 55, 67, 79, 91, 103]},
          {  "name": "Ab", "tones": [32, 44, 56, 68, 80, 92, 104]},
          {  "name": "A",  "tones":  [33, 45, 57, 69, 81, 93, 105]},
          {  "name": "Bb",  "tones":  [34, 46, 58, 70, 82, 94, 106]},
          {  "name": "B",  "tones":  [35, 47, 59, 71, 83, 95, 107]}
        ]
      }
    ];






    var data1 = [
      {
        "major": [
          {  "name": ["Cmaj7"], "formula": ["C", "E", "G", "B"] },
          {  "name": ["Bbmaj7"], "formula": ["Bb", "D", "F", "A"] },
          {  "name": ["Ebmaj7"], "formula": ["Eb", "G", "Bb", "D"] },
          {  "name": ["Abmaj7"], "formula": ["Ab", "C", "Eb", "G"] },
          {  "name": ["Dbmaj7", "C#maj7"], "formula": ["Db", "F", "Ab", "C"] },
          {  "name": ["Gbmaj7", "F#maj7"],  "formula": ["Gb", "Bb", "Db", "F"]},
          {  "name": ["Bmaj7"],  "formula":  ["B", "Eb", "Gb", "Bb"]},
          {  "name": ["Emaj7"], "formula": ["E", "Ab", "B", "Eb"]},
          {  "name": ["Amaj7"], "formula": ["A", "Db", "E", "Ab"]},
          {  "name": ["Dmaj7"],  "formula":  ["D", "Gb", "A", "Db"]},
          {  "name": ["Gmaj7"],  "formula":  ["G", "B", "D", "Gb"]}
        ],
        "dominant": [
          {  "name": ["C7"], "formula": ["C", "E", "G", "Bb"] },
          {  "name": ["Bb7"], "formula": ["Bb", "D", "F", "Ab"] },
          {  "name": ["Eb7"], "formula": ["Eb", "G", "Bb", "Db"] },
          {  "name": ["Ab7"], "formula": ["Ab", "C", "Eb", "Gb"] },
          {  "name": ["Db7", "C#7"], "formula": ["Db", "F", "Ab", "B"] },
          {  "name": ["Gb7", "F#7"],  "formula": ["Gb", "Bb", "Db", "E"]},
          {  "name": ["B7"],  "formula":  ["B", "Eb", "Gb", "A"]},
          {  "name": ["E7"], "formula": ["E", "Ab", "B", "D"]},
          {  "name": ["A7"], "formula": ["A", "Db", "E", "G"]},
          {  "name": ["D7"],  "formula":  ["D", "Gb", "A", "C"]},
          {  "name": ["G7"],  "formula":  ["G", "B", "D", "F"]}
        ],
        "minor": [
          {  "name": ["Cm7"], "formula": ["C", "Eb", "G", "Bb"] },
          {  "name": ["Bbm7"], "formula": ["Bb", "Db", "F", "Ab"] },
          {  "name": ["Ebm7"], "formula": ["Eb", "Gb", "Bb", "Db"] },
          {  "name": ["Abm7"], "formula": ["Ab", "B", "Eb", "Gb"] },
          {  "name": ["Dbm7","C#m7"], "formula": ["Db", "E", "Ab", "B"] },
          {  "name": ["Gbm7","F#m7"],  "formula": ["Gb", "A", "Db", "E"]},
          {  "name": ["Bm7"],  "formula":  ["B", "D", "Gb", "A"]},
          {  "name": ["Em7"], "formula": ["E", "G", "B", "D"]},
          {  "name": ["Am7"], "formula": ["A", "C", "E", "G"]},
          {  "name": ["Dm7"],  "formula":  ["D", "F", "A", "C"]},
          {  "name": ["Gm7"],  "formula":  ["G", "Bb", "D", "F"]}
        ]
      }
    ];


*/



MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

     if(err) throw err;

     else{
       console.log("Successfuly connected to Jazz DB.");
     }

     app.locals.db = db.db("jazz"); //open connection to DB.

/*
     app.locals.db.collection("seventh").insertMany(data1, function(err, res){
      if(err) throw err;
      console.log(res);
      db.close();
   });
   */



});

/*
original db

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
   app.locals.db.collection("tones").insertMany(data, function(err, res){
    if(err) throw err;
    console.log(res);
    db.close();
  })
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
    else{
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


//==================================================================================================


app.use('/client', express.static(__dirname + '/client')); //static files
app.use("/",router); //use router

//============================================================
app.listen(3000, function () { //listen on port 3000
  console.log('Application listening on port 3000.');
});
//=============================================================
