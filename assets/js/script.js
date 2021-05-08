$(document).foundation();
let searchInput;
let favCount;
let addListener;
let choosenGiphys = {
    name: "",
    urls: []
};

//---------------- Search Button Click Event ---------------
$("#search-button").on("click", function(event){
    event.preventDefault();
    searchInput =  $("#search-input").val();
    apiFetch();
})

//--------- Search when we hit enter
$('#search-input').keypress(function(e){
    if(e.keyCode == 13)
    $('#search-button').click();
  });

//---------------- Random character search (I'm feeling lucky) --------------- 
$("#lucky-button").on("click",function(event){
    let offset = Math.floor(Math.random() * 1492) //--- Total characters 1493
    searchInput = "";
    let i = 0;
    let luckyApi = `https://gateway.marvel.com/v1/public/characters?limit=10&offset=${ offset }&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`;
    fetch(luckyApi).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                if(data.data.count !== 0){ //------ Just in case chacking if we got results
                    for(let i = 0; i <= data.data.results.length - 1; i++ ){
                        //----- Minimizing results with no description or picture
                        if(data.data.results[i].description != "" && data.data.results[i].thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){
                            searchInput = data.data.results[i].name;
                            apiFetch();
                            break;   
                        }
                        if (data.data.results[i].description != "" || data.data.results[i].thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){
                            searchInput = data.data.results[i].name;
                        } 
                        if (i == data.data.results.length - 1 && searchInput == "") {
                            searchInput = data.data.results[0].name;
                        }
                    }
                    apiFetch();
                }
            })
        }
    }) 
})

//---------- passing our character name to fetch function to get 
function apiFetch() {
    let apiLink = `https://gateway.marvel.com/v1/public/characters?name=${ searchInput }&ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`
    fetch(apiLink).then(function(response){
        if (response.status == 200) {
            response.json().then(function (data) {
                if(data.data.count !== 0){
                    //--- putting our gifs on the screen
                    displayInfo(data)
                    //------passing name to our giphy api to get 60 results
                    let giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=nwuYq2Fo9Ze7lf358CgrL7CJzWpVdYMG&q=${ searchInput }&limit=60&offset=0&rating=g&lang=en`
                    fetch(giphyApi).then(function(giphyData){
                        if (giphyData.status == 200){
                            giphyData.json().then(function (giphyData) { 
                                // resetting our choosen gifys object
                                choosenGiphys = {
                                    name: "",
                                    urls: []
                                };
                            choosenGiphys.name = searchInput;
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
}

//---------------- dynamically adding our gifs 
function displayInfo(rawData){
    $("#search-input").val("");
    if (rawData.data.results.length != 0){
        if ($(".about-the-author").length){
            $(".about-the-author").empty();
            $(".about-the-author").remove();
            addListener = false;
        }  
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
            let divwrapsmallimages = $("<div>")
                .addClass("divWrap-Small-Images small-12 columns")
                .appendTo(secondDiv)
                $("<div>")
                .addClass(" small-images-div")
                .appendTo(divwrapsmallimages)
                $("<span>")
                .attr("id","save-message")  
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
            } 
 else {
    $('#modalWrongCharacterName').foundation("open");
}
}

//--------------- dynamically adding giphys
function displayGiphys(giphyData){
    let y=0;
    if (giphyData.data.length != 0){
        if ($(".bigGiphyDiv").length){ 
            $(".giphy-div").empty();
            $(".giphy-div").remove();
            $(".bigGiphyDiv").remove();
        }  
        let bigGiphyDiv =  $("<div>")
        .addClass("bigGiphyDiv")
        .appendTo(document.body)
        giphyData.data.forEach(function(){
            //---------- checking for gifs that are 200px - 350px
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
    //--- once all gifs are added we can add click listeners
    addClickListenerBigGiphys();
    addListenerOnSticky();
}

// add click listener for giphys
function addClickListenerBigGiphys() {
    $(".giphy-div").click(function(event) {
        //--- every time we search we have to add listener on gifs
        if(addListener === true){
            clickListenerSmllGiphys();
            favCount = 12;
            addListener = false;
        }
        let sourceGif = $(this).children('img').attr('src');
    if ($(".small-images-div").children().length < 12 ){
         $(".small-images-div").children().each(function(){
            if(sourceGif === $(this).attr('src')) {
                $(this).remove();
            } 
        })
        if(!choosenGiphys.urls.includes(sourceGif)) {
            favCount--;
            $(".giphys").attr("title", favCount + "  Left")
            //---- reverse count
            $("#save-message").text("Save " + `${ Math.abs(favCount - 12) }` + " Giphys to Favorites")
            choosenGiphys.urls.unshift(sourceGif);
        }
        $("<img>")
        .addClass("small-image")
        .attr("src", $(this).children('img').attr('src'))
        .appendTo($(".small-images-div"))
    }
    })
}

// add click listener and save lo local storage on Save button
function addListenerOnSticky(){
    $(".save-fav").on("click", function(){
        let favoriteGiphysBank;
        if ($(".small-images-div").children().length != 0 ){
            $(".small-images-div").children().each(function(){
                $(this).remove();
            })
            favoriteGiphysBank = JSON.parse( localStorage.getItem("Marvelizer") ) || { characterNames: [], storedGiphys: [] };
            if( !favoriteGiphysBank.characterNames.includes(choosenGiphys.name) ) {
                    favoriteGiphysBank.characterNames.unshift(choosenGiphys.name);
                    favoriteGiphysBank.storedGiphys.unshift(choosenGiphys.urls);
                    localStorage.setItem("Marvelizer", JSON.stringify(favoriteGiphysBank));
            } else if ( favoriteGiphysBank.characterNames.includes(choosenGiphys.name) ) {
                    favoriteGiphysBank.characterNames.splice(favoriteGiphysBank.characterNames.indexOf(choosenGiphys.name),1);
                    favoriteGiphysBank.storedGiphys.splice(favoriteGiphysBank.characterNames.indexOf(choosenGiphys.name),1)
                    favoriteGiphysBank.characterNames.unshift(choosenGiphys.name);
                    favoriteGiphysBank.storedGiphys.unshift(choosenGiphys.urls);
                    localStorage.setItem("Marvelizer", JSON.stringify(favoriteGiphysBank));
            }
            $(".giphy-div").empty();
            $(".giphy-div").remove();
            $("#save-message")
            .text("You Have Saved " + choosenGiphys.urls.length + " " + choosenGiphys.name + " Giphys to your Favorites")
            .fadeIn(2000);
            $("#save-message")
            .fadeOut(3000);
            choosenGiphys = {
                name: "",
                urls: []
                };
        }
    })
    }

// click listener for small giphys to add remove
function clickListenerSmllGiphys(){
    $(".small-images-div").on("click", "img", (function(event) {
               favCount++;
               $(".giphys").attr("title", favCount + "  Left")
        $(".spanClassNumber").text(favCount + "  Left")
        $("#save-message").text("Save " + `${ Math.abs(favCount - 12) }` + " Giphys to Favorites")
        choosenGiphys.urls.forEach(element => {
          if (element == $(this).attr('src')) {
            choosenGiphys.urls.splice(choosenGiphys.urls.indexOf(element.trim()) , 1 );
          }
       });
        $(this).remove()
    }))
}

