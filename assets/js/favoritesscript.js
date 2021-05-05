var names = [];
var existingEntries = JSON.parse(localStorage.getItem("marvelizer"));

function displaySearchNames() {
  if (existingEntries !== null) {
    for (let i = 0; i < existingEntries.length; i++) {
      var storedName = existingEntries[i].name;
      // If name not in array
      if (!names.includes(storedName)) {
        names.push(storedName);
      }
    }
    for (let i =  0; i < names.length; i++) {
      let searchLi = $("<li>")
        .addClass("search-name")
        .appendTo(".search-list");
        searchLi.text(names[i]); 
    }
  }
}

function displayGifs(clickedName) {
  if ($(".giphy-div").length){
  $(".giphy-div").empty();
  $(".giphy-div").remove();
  }  
  for (let i = 0; i < existingEntries.length; i++) {
    if (existingEntries[i].name == clickedName) {
      console.log(existingEntries[i].name);
      var gifUrl = existingEntries[i].url;
      let bigGiphyDiv =  $("<div>")
          .addClass("bigGiphyDiv")
          .appendTo($(".gif-area"));
      let secondtGiphyDiv = $("<div>")
          .addClass("giphy-div card card-select")
          .appendTo(bigGiphyDiv);
      $("<img>")
          .addClass("giphys")
          .attr("data-toggle","tooltip")
          .attr("src", gifUrl)
          .appendTo(secondtGiphyDiv)
    }
  }
}

displaySearchNames()

// event listener for list item clicks
let listClickEl = $(".search-name");  
listClickEl.on("click", function(event){
  event.preventDefault();
  let clickedName = $(this).text();
  console.log(clickedName + "  <---------");
  displayGifs(clickedName);
})
