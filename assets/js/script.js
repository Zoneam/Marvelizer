$(document).foundation();
let searchInput;
let favCount;
let addListener;
let choosenGiphys = {
    name: "",
    urls: []
};

$("#search-button").on("click", function(event){
    event.preventDefault();
    searchInput =  $("#search-input").val();
    let apiLink = `https://gateway.marvel.com/v1/public/characters?name=${ searchInput }&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`
    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                if(data.data.count !== 0){
                    // console.log("CharacterData: " , data);
                    displayInfo(data)
                    let giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=nwuYq2Fo9Ze7lf358CgrL7CJzWpVdYMG&q=${ searchInput }&limit=30&offset=0&rating=g&lang=en`
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
            addListener = false;
        }  
            // console.log( $(".about-the-author").length)
        let firstDiv= $("<div>")
                .addClass("about-the-author")
                .appendTo(document.body)
        //-----
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

            let divwrapsmallimages = $("<div>")
                .addClass("divWrap-Small-Images small-12 columns")
                .appendTo(secondDiv)
                
                $("<div>")
                .addClass(" small-images-div")
                .appendTo(divwrapsmallimages)
                $("<span>")
                .attr("id","save-message")  //----new
                .text("Save to favorites")
                .appendTo(divwrapsmallimages)
                $("<img>")
                .addClass("save-fav")
                .attr("src", "./assets/images/save.png")
                .appendTo(divwrapsmallimages)

                
        let heroTitle = $(".author-title");
        let heroDescription = $("#description");
        heroTitle.text(rawData.data.results[0].name);
        heroDescription.text(rawData.data.results[0].description)
        $("#thumbnail").attr("src", rawData.data.results[0].thumbnail.path + ".jpg")
        addListener = true;
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
        if ($(".bigGiphyDiv").length){ //-------------------------------------------------------
            $(".giphy-div").empty();
            $(".giphy-div").remove();
            $(".bigGiphyDiv").remove();
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
                .attr("data-toggle","tooltip")
                .attr("src", giphyData.data[y].images.downsized_medium.url)
                .appendTo(secondtGiphyDiv)
                 }
                y++;
        })
    }


            // $(".save-fav").toggle();

    addClickListenerBigGiphys();
    addListenerOnSticky();
}

// add click listener for giphys
function addClickListenerBigGiphys() {
    $(".giphy-div").click(function(event) {
        if(addListener === true){
            clickListenerSmllGiphys();
            favCount = 12;
            addListener = false;
        }
        let sourceGif = $(this).children('img').attr('src');
        // console.log($(".small-images-div").children())
    if ($(".small-images-div").children().length < 12 ){
         $(".small-images-div").children().each(function(){
            if(sourceGif === $(this).attr('src')) {
                // console.log("Matches")
                $(this).remove();
            } 
        })
        if(!choosenGiphys.urls.includes(sourceGif)) {
            favCount--;
            $(".giphys").attr("title", favCount + "  Left")
            choosenGiphys.urls.unshift(sourceGif);
        }
        // choosenGiphys.urls.unshift($(this).children('img').attr('src'))
        $("<img>")
        .addClass("small-image")
        .attr("src", $(this).children('img').attr('src'))
        .appendTo($(".small-images-div"))
    }
    // console.log(choosenGiphys)
    })
}
// click listener for favorite
function clickListenerSmllGiphys(){
    $(".small-images-div").on("click", "img", (function(event) {
               favCount++;
               $(".giphys").attr("title", favCount + "  Left")
        $(".spanClassNumber").text(favCount + "  Left")
        choosenGiphys.urls.forEach(element => {
          if (element == $(this).attr('src')) {
            choosenGiphys.urls.splice(choosenGiphys.urls.indexOf(element.trim()) , 1 );
          }
       });
        $(this).remove()
    }))
}

// add click listener and save lo local storage on sticky button
function addListenerOnSticky(){
    // $("#save-message").fadeOut(0);
$(".save-fav").on("click", function(){
    let favoriteGiphysBank;
    if ($(".small-images-div").children().length != 0 ){
        // $( ".save-fav" ).hide();
        $(".small-images-div").children().each(function(){
            $(this).remove();
        })
        favoriteGiphysBank = JSON.parse( localStorage.getItem("Marvelizer") ) || { characterNames: [], storedGiphys: [] };
        if( !favoriteGiphysBank.characterNames.includes(choosenGiphys.name) ) {
                favoriteGiphysBank.characterNames.unshift(choosenGiphys.name);
                favoriteGiphysBank.storedGiphys.unshift(choosenGiphys.urls);
                localStorage.setItem("Marvelizer", JSON.stringify(favoriteGiphysBank));
        } else if ( favoriteGiphysBank.characterNames.includes(choosenGiphys.name) ) {
            // if(favoriteGiphysBank.storedGiphys[favoriteGiphysBank.characterNames.indexOf(choosenGiphys.name)].length < 12 ){
                favoriteGiphysBank.characterNames.splice(favoriteGiphysBank.characterNames.indexOf(choosenGiphys.name),1);
                favoriteGiphysBank.storedGiphys.splice(favoriteGiphysBank.characterNames.indexOf(choosenGiphys.name),1)
                favoriteGiphysBank.characterNames.unshift(choosenGiphys.name);
                favoriteGiphysBank.storedGiphys.unshift(choosenGiphys.urls);
                localStorage.setItem("Marvelizer", JSON.stringify(favoriteGiphysBank));
        }
        // $(".save-fav").remove();
        $(".giphy-div").empty();
        $(".giphy-div").remove();
        $("#save-message")
        .text("You Have Saved " + choosenGiphys.urls.length + " " + choosenGiphys.name + " Giphys to your Favorites")
        .fadeIn(2000);
        $("#save-message").fadeOut(3000);
        choosenGiphys = {
            name: "",
            urls: []
            };
console.log(favoriteGiphysBank)
    }
})
}