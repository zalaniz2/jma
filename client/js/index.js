
  //check WEB MIDI
  if(navigator.requestMIDIAccess){
    console.log('This browser supports WebMIDI API.');
  }
  else {
  console.log('WebMIDI is not supported in this browser.');
  }
