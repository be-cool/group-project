var startDateTime = "";
var endDateTime = "";


function dateSelector() {

        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
    
        $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
                startDateTime = picker.startDate.format("YYYY-MM-DDT23:59:59Z");
                endDateTime = picker.endDate.format("YYYY-MM-DDT23:59:59Z")
        });
    
        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });
    
    }
   
    dateSelector();
$("#submit-button").on("click", function(event) {
        event.preventDefault();
        
        function tmConfig() {
            var apiKey = "AGQzpe2wehjnIBAYderXyoH2OHJGe69H";
            var keyWord = "";
            var postalCode = "";
            var milesAway = "";
            // var inputdate = $("#example-date-input").val();
            // console.log("inputdate", inputdate)
            // var dateTime = moment(inputdate);

            // var startDateTime = moment(inputdate).subtract(1, "days").format("YYYY-MM-DDT23:59:59Z");
            // var endDateTime = moment(inputdate).format("YYYY-MM-DDT23:59:59Z");
            // var startDateTime = "";
            // console.log("inside click start date time",startDateTime); //this is what it wants "2019-07-10T20:26:00Z" "2019-07-17T23:59:59-04:00"
            // console.log("inside click end date time", endDateTime);
            // console.log("inside click start date time", moment(startDateTime).format("YYYY-MM-DDT23:59:59Z"));
            // console.log("inside click end date time", moment(endDateTime).format("YYYY-MM-DDT23:59:59Z"));
            var city = $("#location-input").val();
            // var efQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apiKey + "&keyword=" + keyWord + "&postalCode=" + postalCode + "&radius=" + milesAway + "&locale=*&startDateTime=" + startDateTime + "&city=" + city;
            // var efQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apiKey + "&locale=*&city=" + city + "&startEndDateTime=" + startDateTime;
            var efQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apiKey + "&startDateTime=" + startDateTime + "&endDateTime=" + endDateTime + "&city=" + city;
            console.log(efQueryURL);

            // If City is Null exit...
            if (city === "") {
                // console.log("Exit TicketMaster Call");
                return;
            }

            // Clear any previously loaded TicketMaster Cards...
            clearTicketMasterCards();

            $.ajax({
                url: efQueryURL,
                method: "GET"
            }).then(function(response) {
                console.log("TicketMaster");
                console.log(response);
                for (i = 0; i < 12; i++) {
                    var event = {
                        title: response._embedded.events[i].name,
                        city: response._embedded.events[i]._embedded.venues[0].city.name,
                        url: response._embedded.events[i].url,
                        image: response._embedded.events[i].images[0].url,
                        time: response._embedded.events[i].dates.start.dateTime
                        // image: response._embedded.events[i].image
                    }

                    // 1. Make Card Div
                    var cardWrapper = $("<div class='col-sm-3'>");
                    // var eventCard = $("<div class='card col-sm-3'>");
                    var eventCard = $("<div class='card'>");
                    var eventCardBody = $("<div class='card-body'>");
                    // $("#data").append(eventCard);
                    $("#data").append(cardWrapper);
                    cardWrapper.append(eventCard);

                    // Loop through Object Attributes, to get display card data
                    for (key in event) {
                        // Add title
                        if (key == 'title') {
                            var cardTitle = $("<h5 class='card-title'>");
                            cardTitle.text(event[key]);
                            eventCardBody.append(cardTitle);
                        } else if (key == 'image') {
                            var cardImage = $("<img class='card-img-top img-fluid'>").attr("src", event[key]);
                            eventCard.append(cardImage);
                        } else if (key =="city") {
                            var cardCity = $('<h6 class="card-subtitle mb-2 text-muted"></h6>');
                            cardCity.text(event[key]);
                            eventCardBody.append(cardCity);
                        } else if (key == 'time') {
                            // var cardTime = $("<h5 class='card-time'>");
                            var cardTime = $('<p class="card-text"></p>');
                            var momentStartTime = moment(event[key]).format("llll");
                            // cardTime.text(event[key]);
                            cardTime.text(momentStartTime);
                            eventCardBody.append(cardTime);
                        }
                        
                    }
                    eventCard.append(eventCardBody);
                }
            });
        }
        tmConfig()
    });

function clearTicketMasterCards() {
    $("#data").empty();
}