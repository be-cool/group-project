// function ticketmaster(keyWord, city) {

var keyWord = "football";
var postaCode = "";
var milesAway = "";
var startDate = "";
var city = "Philadelphia";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=AGQzpe2wehjnIBAYderXyoH2OHJGe69H&keyword=" + keyWord + "&postalCode=" + postaCode + "&radius=" + milesAway + "&locale=*&startDateTime=" + startDate + "&city=" + city;

$.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response);
            //1.title
            console.log(response._embedded.events[0].name);
            //2.image
            console.log(response._embedded.events[0].images[0].url);
            //3.url
            console.log(response._embedded.events[0].url);
            //4.City Name
            console.log(response._embedded.events[0]._embedded.venues[0].city.name);
            //5.Description
            console.log()

            // City Nane = 
            // var event = {
            //     title: [],
            //     city: [],
            //     url: [],
            //     image: [],
            //     description: []
            //     }

            // }
