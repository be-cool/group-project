
var startDate = '';
var endDate = '';

function dateSelector() {

    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        startDate = picker.startDate.format('YYYYMMDD');
        endDate = picker.endDate.format('YYYYMMDD');
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

}
dateSelector();



$("#submit-button").on("click", function (event) {
    event.preventDefault();
    //  Eventful API config:
    function efConfig() {
        var efKey = "wDFFpKBkf7q72vwh";
        var efLocation = $("#location-input").val();
        var efDate = startDate + "00" + "-" + endDate + "00";
        //  Supported: "All", "Future", "Past", "Today", "Last Week", "This Week", "Next week", 
        //  and months by name, e.g. "October". Exact ranges can be specified the form 'YYYYMMDD00-YYYYMMDD00', 
        //  for example '2012042500-2012042700';    ---this is a date range, will need to integrate search to ask for range---
        //  the last two digits of each date in this format are ignored.
        
        //  Current date search value is in format 
        var efQueryURL = "https://api.eventful.com/json/events/search?app_key=" + efKey + "&location=" + efLocation + "&t=" + efDate;
        // console.log(efQueryURL);
        
        // If City is Null exit...
        if (efLocation === "") {
            // console.log("Exit Eventful Call");
            return;
        }
        // Clear any previously loaded Cards...
        clearEventfulCards();

        $.ajax({
            url: efQueryURL,
            dataType: 'jsonp',
            method: "GET"
        })
            .then(function (response) {
                // console.log(response);

                for (i = 0; i < 10; i++) {
                    var eventfulData = {
                        title: response.events.event[i].title,
                        city: response.events.event[i].city_name,
                        url: response.events.event[i].url,
                        // image: response.events.event[i].image.medium.url,
                        // image: response.events.event[i].image
                        image: response.events.event[i].image === null ? 'assets/css/images/image.png': response.events.event[i].image.medium.url,
                        startTime: response.events.event[i].start_time
                    }

                    // 1. Make Card Div
                    var cardWrapper = $("<div class='col-sm-3'>");
                    var eventCard = $("<div class='card'>");
                    var eventCardBody = $("<div class='card-body'>");

                    // $("#data2").append(eventCard);
                    $("#data2").append(cardWrapper);
                    cardWrapper.append(eventCard);
                    
                    // Loop through Object Attributes, to get display card data
                    for (key in eventfulData) {
                        // Add title
                        if (key == 'title') {
                            var cardTitle = $("<h5 class='card-title'>");
                            cardTitle.text(eventfulData[key]);
                            eventCardBody.append(cardTitle);
                            
                        }
                        else if (key == 'image') {
                            var cardImage = $("<img class='card-img-top img-fluid'>").attr("src", eventfulData[key]);
                            eventCard.append(cardImage)
                            
                        }
                        else if (key =="city") {
                            var cardCity = $('<h6 class="card-subtitle mb-2 text-muted"></h6>');
                            cardCity.text(eventfulData[key]);
                            eventCardBody.append(cardCity);
                        }
                        else if (key == "startTime") {
                            var cardStartTime = $('<p class="card-text"></p>');
                            var momentStartTime = moment(eventfulData[key]).format("llll");
                            // console.log(momentStartTime);
                            // cardStartTime.text(eventfulData[key]);
                            cardStartTime.text(momentStartTime);
                            eventCardBody.append(cardStartTime);
                        }
                        
                    }
                    
                    // Append CardBody after Image is added...
                    eventCard.append(eventCardBody);
                }

            });

    };
    efConfig()
});

function clearEventfulCards() {
    $("#data2").empty();
}

$(document).on("click", ".quick-search", QuickSearch);

function QuickSearch() {
    // 1. Get the City
    var city = $(this).attr("data-city");
    
    // 2. CLear out any existing Cards...
    clearEventfulCards();
    // Manually clearing TIcketMaster Div. Not sure best practice regarding calling function in another JS file...
    $("#data").empty();

    // 3. Construct Query
    var ApiQuery = queryBuilderQuickSearch(city);
    console.log(ApiQuery);

    if (ApiQuery === "") {
        // console.log("Exit Eventful Call");
        return;
    }

    // 4. render cards...
    $.ajax({
        url: ApiQuery,
        dataType: 'jsonp',
        method: "GET"
    })
        .then(function (response) {
            for (i = 0; i < 10; i++) {
                var eventfulData = {
                    title: response.events.event[i].title,
                    city: response.events.event[i].city_name,
                    url: response.events.event[i].url,
                    image: response.events.event[i].image === null ? 'assets/css/images/image.png': response.events.event[i].image.medium.url,
                    startTime: response.events.event[i].start_time
                }

                // 1. Make Card Div
                var cardWrapper = $("<div class='col-sm-3'>");
                var eventCard = $("<div class='card'>");
                var eventCardBody = $("<div class='card-body'>");

                $("#data2").append(cardWrapper);
                cardWrapper.append(eventCard);

                
                // Loop through Object Attributes, to get display card data
                for (key in eventfulData) {
                    if (key == 'title') {
                        var cardTitle = $("<h5 class='card-title'>");
                        cardTitle.text(eventfulData[key]);
                        eventCardBody.append(cardTitle);
                        
                    }
                    else if (key == 'image') {
                        var cardImage = $("<img class='card-img-top img-fluid'>").attr("src", eventfulData[key]);
                        eventCard.append(cardImage)
                        
                    }
                    else if (key =="city") {
                        var cardCity = $('<h6 class="card-subtitle mb-2 text-muted"></h6>');
                        cardCity.text(eventfulData[key]);
                        eventCardBody.append(cardCity);
                    }
                    else if (key == "startTime") {
                        var cardStartTime = $('<p class="card-text"></p>');
                        var momentStartTime = moment(eventfulData[key]).format("llll");
                        cardStartTime.text(momentStartTime);
                        eventCardBody.append(cardStartTime);
                    }
                    
                }
                
                // Append CardBody after Image is added...
                eventCard.append(eventCardBody);
            }

        });

}

function queryBuilderQuickSearch(city) {
    switch(city) {
        case "Philadelphia":
            return "https://api.eventful.com/json/events/search?app_key=wDFFpKBkf7q72vwh&location=Philadelphia"
            break;
        case "DC":
            return "https://api.eventful.com/json/events/search?app_key=wDFFpKBkf7q72vwh&location=Washington%20DC"
          break;
        case "Boston":
            return "https://api.eventful.com/json/events/search?app_key=wDFFpKBkf7q72vwh&location=Boston"
            break;
        case "NYC":
            return "https://api.eventful.com/json/events/search?app_key=wDFFpKBkf7q72vwh&location=New%20York%20City"
            break;
        default:
            return ""
      }
    
}
