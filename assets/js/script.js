
$(document).foundation();

$("#search-button").on("click", function(event){
    event.preventDefault();
    // $('exampleModal2').foundation('reveal', 'open');
    let searchInput =  $("#search-input").val();
    let apiLink = `https://gateway.marvel.com/v1/public/characters?name=${ searchInput }&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`
    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                console.log("CharacterData: " , data);
                displayInfo(data)
                let giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=nwuYq2Fo9Ze7lf358CgrL7CJzWpVdYMG&q=${ searchInput }&limit=80&offset=0&rating=g&lang=en`
                fetch(giphyApi).then(function(giphyData){
                    if (giphyData.status == 200){
                        giphyData.json().then(function (giphyData) {
                        console.log("giphyData: " , giphyData);
                        displayGiphys(giphyData);
                    })
                    } else {
                        console.log("Bad Request!")
                    }
                })
            })
        } else {
            alert("Please enter valid character name")
        }
    })
    .catch(function(){
        console.log("Bad Request!")
    })
})

function displayInfo(rawData){
    // console.log(rawData)
    $("#search-input").val("");
    if (rawData.data.results.length != 0){
        if ($(".about-the-author").length){
            $(".about-the-author").empty();
            $(".about-the-author").remove();
        }  
            // console.log( $(".about-the-author").length)
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
                .addClass("small-12 medium-4 columns")
                .appendTo(secondDiv)
                $("<h4>")
                .addClass("separator-left author-title")
                .appendTo(pDiv)
                $("<p>")
                .attr("id", "description")
                .appendTo(pDiv)
                $("<div>")
                .addClass("small-12 medium-4 columns small-images-div")
                .appendTo(secondDiv)

        let heroTitle = $(".author-title");
        let heroDescription = $("#description");
        heroTitle.text(rawData.data.results[0].name);
        heroDescription.text(rawData.data.results[0].description)
        $("#thumbnail").attr("src", rawData.data.results[0].thumbnail.path + ".jpg")

        // console.log(rawData)
            } 
 else {
    alert("Nothing Found")
}
}

function displayGiphys(giphyData){
    let y=0;
    if (giphyData.data.length != 0){
        if ($(".giphy-div").length){
            $(".giphy-div").empty();
            $(".giphy-div").remove();
        }  
        giphyData.data.forEach(function(){
            if(giphyData.data[y].images.downsized_medium.height <= 350 && giphyData.data[y].images.downsized_medium.height >= 200){
                let secondtGiphyDiv = $("<div>")
                .addClass("giphy-div card card-select")
                .appendTo(document.body);
                $("<img>")
                .addClass("giphys")
                .attr("src", giphyData.data[y].images.downsized_medium.url)
                .appendTo(secondtGiphyDiv)


                $("<img>")
                .addClass("small-image")
                .attr("src", giphyData.data[y].images.downsized_medium.url)
                .appendTo($(".small-images-div"))
                 }
                y++;
        })

    }
}

// ------------
