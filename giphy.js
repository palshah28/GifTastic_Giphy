var buttonArray = ["Superman","Ironman","Batman","Hulk","Catwoman","Black Panther","Captain America","Aquaman"];
//var buttonTag = 0;


window.onload = function() 
{
          //  console.log(searchTerm);
          //showButtons();
          //buttonTag = $("<button>").attr("class","btn btn-danger heroButton");
          
          for (i=0;i<buttonArray.length;i++) { 
            showButtons(buttonArray[i],i+1) ;
          }        
         
};


$("#addbuttons").on("click",function(event){

    event.preventDefault();
    var userInput = $("#searchterm").val();
    //alert(userInput);
    //console.log($("#searchterm").val());
    buttonArray.push(userInput);
   // console.log(buttonArray);
    showButtons(userInput,buttonArray.length);
    $("#searchterm").val('');
console.log(buttonArray.length);
});


    //e.preventDefault();

  

function showButtons(userInput,index) {

   
   var buttonTag = $("<button>").attr("class","btn btn-danger heroButton");
    buttonTag.attr("hero-name",userInput);
    buttonTag.attr("id",index);
    buttonTag.text(userInput);
  //  var pTag = $("<p>").attr("class","ptag");
  //  pTag.append(buttonTag);
    $(".buttonSections").append(buttonTag);

    $("#"+index).on("click",showGifs);
  //

   
}



function showGifs() {
   $("#giphyContent").empty(); 
  console.log($(this).attr("hero-name"));
  var heroName = $(this).attr("hero-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  heroName + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);
          
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var herosDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var pTag = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var heroImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            heroImage.attr("src", results[i].images.fixed_height.url);
            heroImage.attr("data-still",results[i].images.fixed_height_still.url);
            heroImage.attr("data-animate",results[i].images.fixed_height.url);
            heroImage.attr("class","gif"+i);
            heroImage.attr("data-state","animate");
            $(".gif"+i).on("click", function() {
                console.log(this);
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
          //  console.log(response);
            // Appending the paragraph and image tag to the animalDiv
            herosDiv.append(pTag);
            herosDiv.append(heroImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#giphyContent").prepend(herosDiv);

            
          }
    });
          

}



   
