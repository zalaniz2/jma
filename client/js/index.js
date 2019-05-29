var tone;

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

$("#connect").click(function(e){

  console.log("Attempting to connect.");
  testConnection();

  $.ajax({
     type: 'POST',
     data: JSON.stringify({ type: "tones" }),
     contentType: 'application/json',
     url: 'http://localhost:3000/tones',
     success: function(response) {
       createTones(response);
    },
    error: function (jqXHR, exception) {
      console.log("Error with AJAX request.");
    }

  });

});


function createTones(response){

  tone = Array.from(response);
  console.log("Tones are..");
  console.log(tone);

}


$('.list-group a').click(function(e) {

    var id = e.target.id;
    var header = $("#" + id).html();
    console.log(header);

    $(".list-group a").removeClass("side-bold");
    $("#" + id).addClass("side-bold");

    if( id == "home" || id == "about"){
      $("#home-wrapper").removeClass("d-none");
      $("#exercise-wrapper").addClass("d-none");
      return; //no need for new call;
    }
    else{

      $("#title-exercise").html(header);
      $("#home-wrapper").addClass("d-none");
      $("#exercise-wrapper").removeClass("d-none");


      $.ajax({
         type: 'POST',
         data: JSON.stringify({ type: id }),
         contentType: 'application/json',
         url: 'http://localhost:3000/chords',
         success: function(response) {
           console.log(response);
           beginExercise(response, id, 4);
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
