let searchButton = $("#search-button");

searchButton.on("click", function(event){
    event.preventDefault();
    let searchInput =  $("#search-input").val();
    let apiLink = `http://gateway.marvel.com/v1/public/characters?name=${searchInput}&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`
    console.log(apiLink)
    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                displayInfo(data)
            })
        } else {
            alert("Please enter valid character name")
        }
    })
    .catch(function(){
        console.log("Bad Request")
    })
})

function displayInfo(rawData){
    $("#search-input").val("");
    if ($(".about-the-author").length){
        $(".about-the-author").empty();
        $(".about-the-author").remove();
    }  
        console.log( $(".about-the-author").length)
    let firstDiv= $("<div>")
            .addClass("about-the-author")
            .appendTo(document.body)
    let secondDiv =$("<div>")
            .addClass("row")
            .appendTo(firstDiv)
    let thirdDiv = $("<div>")
            .addClass("small-12 medium-4 columns")
            .appendTo(secondDiv)
    let fourthDiv = $("<div>")
            .addClass("author-image")
            .appendTo(thirdDiv)
            $("<img>")
            .attr("id", "thumbnail")
            .attr("src", rawData.data.results[0].thumbnail.path + ".jpg")
            .appendTo(fourthDiv)
    let pDiv = $("<div>")
            .addClass("small-12 medium-8 columns")
            .appendTo(secondDiv)
            $("<h4>")
            .addClass("separator-left author-title")
            .appendTo(pDiv)
            $("<p>")
            .attr("id", "description")
            .appendTo(pDiv)

    let heroTitle = $(".author-title");
    let heroDescription = $("#description");
    heroTitle.text(rawData.data.results[0].name);
    heroDescription.text(rawData.data.results[0].description)
    $("#thumbnail").attr("src", rawData.data.results[0].thumbnail.path + ".jpg")

    console.log(rawData)
 
   
}

