// Set the Global variables

var arr = ["pacman","asteroids","dig dug","joust","missle command","spy hunter","centepede","robotron 2084","dragons lair","galaga","galaxian","donkey kong","space invaders"];
var subject =""
var newsub =""

renderbuttons(arr)
// Generate the buttons, from the pre-existing array

function renderbuttons(arr){
    $("#game-insert").val("");
    $("#STARTBUTTONS").empty();
    for (var i=0;i<arr.length;i++) {
        var buttons = $("<button/>",{text:arr[i],id:arr[i]});
        $("#STARTBUTTONS").append(buttons);
    };
};
//create handler for the form input
$("#add-game").on("click", function(event) {
    event.preventDefault();
    var pick = $("#game-insert").val();
    if (pick !== "") {
    arr.push(pick);
  
//send the new button home!
    renderbuttons(arr);
 
    }
});



// create document listener, and pass off target info to appropriate handler
$(document).off("click").on("click", function(event){
    console.log(event.target.localName)
    console.log(event)
    if ( event.target.localName === "button" ) {
        picmaker(event.target.id);
    }else if (event.target.localName === "img" ){
        console.log(event)
        picmotion(event.target.id);
        
    }
});

// get the gifs to animate, and pause.
function picmotion(y) {  
    var icon =document.getElementById(y);
        if ($(icon).attr("active") === "false"){
            $(icon).attr("src",($(icon).attr("anim")));
            $(icon).attr("active","true")
        }else{
            $(icon).attr("src",($(icon).attr("stop")));
            $(icon).attr("active","false");
        }
};
// generate the gifs with the Giphy API
function picmaker(x) {
    var subject = (x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=Q2lrwAcl15KAz6XG41LXfR6uQ98yKph3&limit=10"; 
    $.ajax({url: queryURL,method: "GET"})
    .then(function(response) {
        $("#displayField").empty()
        var gifgrab = response.data
        // for loop to dynamiclly add the gifs 
        for (j=0;j<gifgrab.length;j++) {
            var pic = $("<span>").addClass("pic"+[j])
            // absorb the data needed to animate, and still the gifs
            var frame = $("<img>").attr("id","pic"+[j]).attr("src",gifgrab[j].images.fixed_width_still.url).attr("anim",gifgrab[j].images.fixed_width.url).attr("stop",gifgrab[j].images.fixed_width_still.url).attr("active", "false")
            var rate = $("<p>").text("Rating: "+gifgrab[j].rating)
            $(pic).append(frame).append(rate)
            $("#displayField").append(pic)
        }
    });
};
