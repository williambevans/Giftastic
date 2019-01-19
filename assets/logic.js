//this array establishes the value for initial animal buttons

var animals = ["Dog", "Cat", "Elephant", "Ant", "Octopus", "Rabbit", "Catfish", "Turtle", "Beaver", "Cheetah", "Dolphin", "Donkey", "Racoon", "Monkey", "Fish", "Duck", "Frog", "Newt", "Buffalo", "Butterfly", "Gorilla", "Grasshopper"];

console.log(animals); // testing the animals array

function renderButtons() { //function to render initial buttons 

    $("#animal-buttons").empty(); //targets the empty #animal-buttons div

    for (var i = 0; i < animals.length; i++) { //for loop running through the length of the animals array 

        var name = animals[i] // establishes var name with a value of animals[i] each iteration

        $("#animal-buttons").append('<button data-animal=' + animals[i] + '>' + animals[i] + "</button>"); // targets #animal-buttons div then appends button with added attribute and value assigned in the loop
    }
}


$("#add-animal").on("click", function (event) { //targets the #add-animal, uses .on method and assigns the "click" function 

    event.preventDefault();

    var animalAdd = $("#animal-input").val().trim(); // This line of code will grab the input from the textbox

    animals.push(animalAdd); // The animal from the textbox is then added to animals array

    renderButtons(); // Calling renderButtons which handles the processing of animals array
});
renderButtons();



$(document.body).on("click", "button", function () { // calls any "button", uses .on method and assigns the "click" function

    console.log(($("button")))

    var animal = $(this).attr("data-animal"); // targets the data-animal attribute of button clicked and stores into animal variable 

    console.log(animal); //console logs animal variable to confirm the data-animal attribute is stored 

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"; //establishes the query url to incorporate the value of animal variable

    console.log(queryURL);
    $.ajax({ //ajax call that uses "GET" method on the established queryURL
        url: queryURL,
        method: "GET"
    }).then(function (response) { //.then method returns promise used in the function 

        console.log(response); //logs response from the ajax call to confirm the call went through

        var results = response.data; //stores response.data in results variable 

        console.log(results); //logs results to confirm the index traverse checks out

        for (var i = 0; i < results.length; i++) { // loop that runs through the length of results array

            var animalDiv = $("<div class='column'>"); // creates <div></div> and stores in variable 

            var p = $("<p>").text("Rating : " + results[i].rating); //creates <p></p> and adds the rating of current results [i]

            // var link = $('<a href=' + results[i].images.fixed_height.url + ' download=' + results[i].images.fixed_height.url + '>' + '<p>Download</p>');

            var animalImage = $("<img class='gif' style='width:225px;height:200px;'>"); //creates <img> with a set size and class to target
            
            animalImage.attr("src", results[i].images.fixed_height_still.url); //adds src attribute to animalImage variable
            animalImage.attr("data-still", results[i].images.fixed_height_still.url); //adds data-still attribute to animalImage variable
            animalImage.attr("data-animate", results[i].images.fixed_height.url); //adds data-animate attribute to animalImage variable 
            animalImage.attr("data-state", 'still'); //adds data-state attribute to animalImage variable 



            animalDiv.append(animalImage, p); //"dumps" animalImage + p into the empty animalDiv

            $(".row").prepend(animalDiv); //targets .row class and "dumps" animalDiv 
        }

        $(".gif").on("click", function () { //targets .gif class, uses .on method to assign click function 

            var gifButton = $(this); //stores the current .gif clicked into a variable 
            var state = $(this).attr("data-state"); //stores the data-state of current .gif clicked into a variable 

            console.log(state); //logs the state to confirm variable holds the data-state of current .gif clicked

            if (state === "still") { //conditional statement to check if .gif clicked has a data state of still 
                gifButton.attr('src', gifButton.attr('data-animate')); //changes gifButton src to data-animate
                gifButton.attr('data-state', 'animate') //changes gifButton data-state to animate 
            } else { //conditional statement that runs if state === still is false 
                gifButton.attr('src', gifButton.attr('data-still'));
                gifButton.attr('data-state', 'still')
            }
        });
    });
});

