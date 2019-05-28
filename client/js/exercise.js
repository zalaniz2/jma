
var step;
var spot;
var wrong;
var activeSet;
var correctSet, testSet;
var isConnected = false;
var testSize = 0;

function beginExercise(set, id, size){

  $("#missing-keys").html("");
  $("#wrong-attempts").addClass("d-none");
  $("#info-after").addClass("d-none");
  $("#done-wrapper").removeClass("highlight");
  $("#show-scale").removeClass("d-none");

  console.log("Beggining " + whichExercise(id) + " exercise.");
  console.log("Set is...");

  correctSet = Array.from(set);
  testSet = Array.from(set);
  console.log(correctSet);
  $("#scale").html(testSet[0].name);

  step = 0;
  spot = 0;
  wrong = 0;
  activeSet = [];
  testSize = size; //size of input to be checked, i.e. chord, scale, etc.
  resetTime();


  if( ! isConnected ){
    isConnected = true;
    navigator.requestMIDIAccess().then(onMessageSuccess, onMessageFailure);
  }

}

function onMessageSuccess(midiAccess) {

  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;

  for (var input of midiAccess.inputs.values()){
    input.onmidimessage = getMessage;
  }

}

function onMessageFailure(midiAccess){
    console.log("Error accessing");
}

function getMessage(message){

  var command = message.data[0];
  var note = message.data[1];
  var velocity = (message.data.length > 2) ? message.data[2] : 0;

  switch(command){
    case 144:
      if( velocity > 0){
        noteOn(note);
      }
      else{
        noteOff(note);
      }
      break;
    case 128:
      noteOffCallback(note);
      break;
  }

}

function noteOn(note){

  switch(step){
    case 0: step++; //go to next
            runExercise("start");
            break;

    case 1: activeSet.push(note);
            console.log(activeSet);

            if( activeSet.length == testSize){

              var cur = Array.from(testSet[0].formula);
              console.log(cur);

              for( var i = 0; i<testSize; i++){

                var t = findWhichTone(activeSet[i]);
                var inx = cur.indexOf(t);
                if( inx !== -1){
                  console.log("Note is in Formula");
                  cur.splice(inx, 1);
                  console.log(cur);
                }

              }

              if( cur.length == 0){
                $("#show-scale").addClass("corr");
                $("#missing-keys").html("");
                testSet.shift();
                console.log(testSet);
                if( testSet.length == 0){
                  stopTime();
                  setTimeout( function(){  $("#show-scale").removeClass("corr"); }, 300)
                  finishExercise();
                }
                else{
                  setTimeout( function(){  $("#show-scale").removeClass("corr"); $("#scale").html(testSet[0].name); }, 300)
                }
              }
              else{
                wrong++;
                $("#show-scale").addClass("err");
                var missing = "Missing Notes: ";
                for( var i = 0; i<cur.length; i++){
                    missing += cur[i] + " ";
                }
                $("#missing-keys").html(missing);
                setTimeout( function(){  $("#show-scale").removeClass("err"); }, 300)
              }
              activeSet = [];

            }

            break;
      case 2: runExercise("finish");
              break;
  }

}

function noteOff(note){
  //have a function, dont need to use
  switch(step) {
       case 2:
           // Remove the note value from the active chord array
           activeSet = [];
           break;
   }
}


//for updating UI when needed
function runExercise(update){

  switch(update){
    case "start": resetTime();
                  $("#wrong-attempts").addClass("d-none");
                  $("#info-after").addClass("d-none");
                  $("#done-wrapper").removeClass("highlight");
                  console.log("Beginning exercise!");
                  $("#exercise-txt").addClass("d-none");
                  $("#timer").removeClass("d-none");
                  $("#show-scale").removeClass("d-none");
                  startTime();
          break;
  }

}

function finishExercise(){

  testSet = Array.from(correctSet);
  step = 0;
  activeSet = [];
  console.log("in finish?");
  $("#wrong-attempts").html("Wrong Attempts: " + wrong);
  $("#wrong-attempts").removeClass("d-none");
  $("#info-after").removeClass("d-none");

  $("#scale").html(testSet[0].name);
  $("#show-scale").addClass("d-none");
  $("#done-wrapper").addClass("highlight");
  wrong = 0;

}

function noteOffCallback(note){
  //one hand up, dont need to worry.
}

function findWhichTone(key){


  for( var i = 0; i<tone.length; i++){

        if( tone[i].tones.indexOf(key) !== -1){
          console.log("The key pressed is " + tone[i].name);
          return tone[i].name;
        }
  }

}
