
//  Eventful API config:
function efConfig() {

    var efKey = "wDFFpKBkf7q72vwh";
    var efLocation = "San Diego"
    var efQueryURL = "http://api.eventful.com/json/events/search?app_key=" + efKey + "&location=" + efLocation;


    $.ajax({
        url: efQueryURL,
        dataType: 'jsonp',
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            var event = {
                title: response.events.event[0].title,
                city: response.events.event[0].city_name,
                url: response.events.event[0].url,
                image: response.events.event[0].image.small.url,
            }
            console.log(event);


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
efConfig();