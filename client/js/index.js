

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

$("#connect").click(function(e){
  console.log("Attempting to connect.");
  testConnection();
});


$('.list-group a').click(function(e) {

    var id = e.target.id;

    $(".list-group a").removeClass("side-bold");
    $("#" + id).addClass("side-bold");

    if( id == "home"){
      return; //no need for new call;
    }
    else{

      $.ajax({
         type: 'POST',
         data: JSON.stringify({ type: id }),
         contentType: 'application/json',
         url: 'http://localhost:3000/chords',
         success: function(response) {
           console.log(response);
           beginChordPractice(response, id);
        },
        error: function (jqXHR, exception) {
          console.log("Error with AJAX request.");
        }

      });

    }

});

function whichExercise(id){
  if( id == "ex1"){
    return "Major 7th Chords";
  }
  else if( id == "ex2"){
    return "Dominant 7th Chords";
  }
  else if(id == "ex3"){
    return "Minor 7th Chords";
  }
}
