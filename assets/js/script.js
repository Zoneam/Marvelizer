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
    
    console.log(rawData)
    console.log (rawData.data.results.name)
   
}

