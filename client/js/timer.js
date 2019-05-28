var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
interval = null;


function startTime(){

  interval = setInterval(setTime, 1000);
}

function stopTime(){
  clearInterval(interval);
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function resetTime(){
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
  totalSeconds = 0;
  stopTime();
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
