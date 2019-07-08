
$("#submit-button").on("click", function(event){
    event.preventDefault();
//  Eventful API config:
function efConfig() {
    // console.log(1)
    var efKey = "wDFFpKBkf7q72vwh";
    var efLocation = $("#location-input").val();
    var efQueryURL = "http://api.eventful.com/json/events/search?app_key=" + efKey + "&location=" + efLocation;

    // console.log(efQueryURL);

// console.log(efLocation);


    $.ajax({
        url: efQueryURL,
        dataType: 'jsonp',
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            for (i=0; i < 12; i++) {
                var event = {
                    title: response.events.event[i].title,
                    city: response.events.event[i].city_name,
                    url: response.events.event[i].url,
                    image: response.events.event[i].image.medium.url,
                    // image: response.events.event[i].image
                }
                // 1. Make Card Div

                var eventCard = $("<div class='card col-sm-3'>");
                // var eventCard = $("<h5>Hello Wolrd</h5>");
                var eventCardBody = $("<div class='card-body'>");

                $("#data").append(eventCard);
                eventCard.append(eventCardBody);


                
                // Loop through Object Attributes, to get display card data
                for (key in event) {
                    // Add title
                    if (key == 'title') {
                        var cardTitle = $("<h5 class='card-title'>");
                        cardTitle.text(event[key]);
                        eventCardBody.append(cardTitle);

                    }
                    else if (key == 'image') {
                        var cardImage = $("<img class='card-img-top'>").attr("src", event[key]);
                        eventCard.append(cardImage)

                    }

                    // console.log("Loop Counter" + key + " - " + event[key])
                }
            }

            // console.log(event);

            // $("#data").text(JSON.stringify(response));
            // for (key in event) {
            //     console.log("Loop Counter" + key + " - " + event[key])
            // }
            //  Data within response that we could use: (events.event.<data>)
            //      - title
            //      - description
            //      - image
            //      - city_name
            //      postal_code
            //      - url
            //      region_name
            //      - venue_address

        });

};
efConfig()});