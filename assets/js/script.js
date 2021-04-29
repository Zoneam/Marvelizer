/*
public = 2ef8d58d6e4c1a6eb9fe640436563e2c

Hash = 1dc2ab0b405c9380a1f91ed453e0b2c728b4f27ce2ef8d58d6e4c1a6eb9fe640436563e2c
*/

let searchButton = $("#search-button");

searchButton.on("click", function(event){
    event.preventDefault();
    let apiLink = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2ef8d58d6e4c1a6eb9fe640436563e2c&hash=4b46213c75452f9fc065e74ea4d8d2d3`

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
    $.each(rawData.data.results, function(i){
    console.log (rawData.data.results[i].name)


    })
}