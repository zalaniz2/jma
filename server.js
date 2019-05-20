

const express = require('express'); //load express
const app = express();
var router = express.Router(); //middle layer router
var path = __dirname + '/client/views/'; //path to html pages


//==================================================================================================

router.use(function (req,res,next) {
  console.log("/" + req.method); //show what type of request is coming in, move to next requests
  next();
});

router.get('/', function (req, res) { //root (index page)
  res.sendFile(path + "index.html");
});
//==================================================================================================


app.use('/client', express.static(__dirname + '/client')); //static files
app.use("/",router); //use router

//============================================================
app.listen(3000, function () { //listen on port 3000
  console.log('Application listening on port 3000.');
});
//=============================================================
