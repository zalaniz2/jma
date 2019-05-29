
function testConnection(){

  if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI.');
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }
  else {
    console.log('WebMIDI is not supported in this browser.');
    $("#connectAlert").html('<strong>Problem:</strong> This browser does not support this application, please use Chrome/Opera.');
    showAlert();

  }

}

function onMIDISuccess() {

    console.log("Access to MIDI I/O successful.");
    $("#connectAlert").html('Access to MIDI was <strong>successful!</strong>');
    showAlert();
    $("#menu").find('a').removeClass("disabled");


}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
    $("#connectAlert").html("<strong>Problem:</strong> Could not access your computer" + "'s " +  "MIDI devices.");
    showAlert();

}

function showAlert(){

  $("#connectAlert").addClass('show');
  setTimeout(function(){
    $("#connectAlert").removeClass('show');
  }, 5000);

}
