
$(document).foundation();
let searchInput;
let choosenGiphys = {
    name: "",
    urls: []
};

let favoriteGiphysBank = {
    characterNames: [],
    storedGiphys: []
}

$("#search-button").on("click", function(event){
    event.preventDefault();
    searchInput =  $("#search-input").val();
    let apiLink = `https://gateway.marvel.com/v1/public/characters?name=${ searchInput }&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`
    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                if(data.data.count !== 0){
                    console.log("CharacterData: " , data);
                    displayInfo(data)
                    let giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=nwuYq2Fo9Ze7lf358CgrL7CJzWpVdYMG&q=${ searchInput }&limit=80&offset=0&rating=g&lang=en`
                    fetch(giphyApi).then(function(giphyData){
                        if (giphyData.status == 200){
                            giphyData.json().then(function (giphyData) {
                                choosenGiphys = {
                                    name: "",
                                    urls: []
                                };
                            choosenGiphys.name = searchInput;
                            // console.log("giphyData: " , giphyData);
                            displayGiphys(giphyData);
                    })
                        } else {
                            $("#search-input").val("");
                            $('#Nothing-Found').foundation("open");
                    }
                })
                } else {
                    $("#search-input").val("");
                    $('#Nothing-Found').foundation("open");
                }
            })
        } else {
            $('#modalBadRequest').foundation("open");
        }
    })
    .catch(function(){
        $('#modalBadRequest').foundation("open");
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
    $('#modalWrongCharacterName').foundation("open");
}
}
//--------- search when we hit enter
$('#search-input').keypress(function(e){
    if(e.keyCode == 13)
    $('#search-button').click();
  });

function displayGiphys(giphyData){
    let y=0;
    if (giphyData.data.length != 0){
        if ($(".giphy-div").length){
            $(".giphy-div").empty();
            $(".giphy-div").remove();
        }  
        let bigGiphyDiv =  $("<div>")
        .addClass("bigGiphyDiv")
        .appendTo(document.body)
        giphyData.data.forEach(function(){
            if(giphyData.data[y].images.downsized_medium.height <= 350 && giphyData.data[y].images.downsized_medium.height >= 200){
                let secondtGiphyDiv = $("<div>")
                .addClass("giphy-div card card-select")
                .appendTo(bigGiphyDiv);
                $("<img>")
                .addClass("giphys")
                .attr("src", giphyData.data[y].images.downsized_medium.url)
                .appendTo(secondtGiphyDiv)
                 }
                y++;
        })
    }
    addClickListenerBigGiphys();
}

// add click listener for giphys
function addClickListenerBigGiphys() {
    $(".giphy-div").click(function(event) {
        if($(".small-images-div").children().length < 1){
            clickListenerSmllGiphys();
        }
        let sourceGif = $(this).children('img').attr('src');
        // console.log($(".small-images-div").children())
    if ($(".small-images-div").children().length < 12 ){
         $(".small-images-div").children().each(function(){
            if(sourceGif === $(this).attr('src')) {
                console.log("Matches")
                $(this).remove();
            } 
        })
        if(!choosenGiphys.urls.includes(sourceGif)) {
            choosenGiphys.urls.unshift(sourceGif)
        }
        // choosenGiphys.urls.unshift($(this).children('img').attr('src'))
        $("<img>")
        .addClass("small-image")
        .attr("src", $(this).children('img').attr('src'))
        .appendTo($(".small-images-div"))
    }
    console.log(choosenGiphys)
    })
}

function clickListenerSmllGiphys(){
    $(".small-images-div").on("click", "img", (function(event) {
        choosenGiphys.urls.forEach(element => {
          if (element == $(this).attr('src')) {
            choosenGiphys.urls.splice(choosenGiphys.urls.indexOf(element.trim()) , 1 );
          }
       });
        $(this).remove()
    }))
}
