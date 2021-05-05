var names = [];

function displaySearchNames() {
  var existingEntries = JSON.parse(localStorage.getItem("marvelizer"));
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

displaySearchNames()

// event listener for list item clicks

let listClickEl = $(".search-name");  
listClickEl.on("click", function(event){
  event.preventDefault();
  let clickedItem = $(this).text();
  console.log(clickedItem + "  <---------");
})