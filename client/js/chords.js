
var step;
var spot;
var wrong;
var activeChord;
var correctChord, testChord;
var isConnected = false;

function beginChordPractice(chords, id){

  console.log("Beggining " + whichExercise(id) + " exercise.");
  console.log("Chords are...");

  correctChord = Array.from(chords);
  testChord = Array.from(chords);
  console.log(correctChord);

  step = 0;
  spot = 0;
  wrong = 0;
  activeChord = [];

  if( ! isConnected ){
    isConnected = true;
    navigator.requestMIDIAccess().then(onChordSuccess, onChordFailure);
  }

}

function onChordSuccess(midiAccess) {

  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;

  for (var input of midiAccess.inputs.values()){
    input.onmidimessage = getChordMessage;
  }

}

function onChordFailure(midiAccess){
    console.log("Error accessing");
}

function getChordMessage(message){

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
            runChordExercise("start");
            break;

    case 1: activeChord.push(note);
            console.log(activeChord);

            if( activeChord.length == 4){

              for( var i = 0; i<4; i++){

                var correct = true;

                if( testChord[spot].formula.indexOf(activeChord[i]) < 0 ){
                  correct = false;
                  break;
                }

              }

              if( correct ){

                testChord.shift();
                console.log(testChord);
                if( testChord.length == 0){
                  step++;
                  console.log("You finished, clicked any key to restart.");
                  console.log("Total wrong = " + wrong);
                }
              }
              else{
                  wrong++;
              }

              activeChord = [];

              }
            break;
      case 2: console.log("Restarting..");
              testChord = Array.from(correctChord);
              step = 0;
              activeChord = [];
              wrong = 0;
              break;


  }

}

function noteOff(note){
  //have a function, dont need to use
  switch(step) {
       case 2:
           // Remove the note value from the active chord array
           activeChord = [];
           break;
   }
}


//for updating UI when needed
function runChordExercise(update){

  switch(update){
    case "start": console.log("Beginning practice now!");
          break;
  }

}

function noteOffCallback(note){
  //one hand up, dont need to worry.
}
