/*--- Step 1 - Defining global variables ---*/

/*--- Step 2 - Defining functions ---*/

/*--- Step 3 - Using functions ---*/




//$(document).ready(function () {
//    $
//
//
//
//})
//
//
//var locationInput = $("#location-search").val();
//var eventInput = $("#event-search").val();
//var dateInput = $("date-input").val();
//
//
//function eventfulApi(userSearch) {
//    $.getJSON('http://api.eventful.com/json/events/search'), {
//        app_key: "wVDHxstqGNMJvHGB",
//        location: locationInput,
//        date: dateInput,
//        category:
//    }
//}
//
//function ticketMasterApi {
//    key: "gTqUrGAhPVOo80W5dwim0PACPObENQ0h"
//}
//
//
//function renderResults()




//function displayResults()

let lat = "40.730610";
let long = "-73.935242";

function getEventful() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function saveLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    getEventfulApi(lat, long);
}

function getEventfulApi(lat, long) {
    /* Update all the parameters for your API test*/
    var params = {
        app_key: 'Jsr6ndZBQLW9qdLL',
        keywords: 'concert&location',
        location: "40.730610,-73.935242",
        date: 'This%20Week',
        within: 25,
    };
    var result = $.ajax({
            /* update API end point */
            url: "http://api.eventful.com/json/events/search",
            data: params,
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            displayEventful(result);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayEventful(data) {
    console.log('In displayEventful');
    console.log(data); // NOTE - PROGRAM THROWS ERROR BEFORE THIS POINT, SO HAVEN'T VIEWED OUTPUT
    const results = data.events.event.map((item, index) => renderEventful(item)); // THIS NEEDS TO BE EDITED ONCE I CAN SEE THE OBJECT
}

function renderEventful(result) {
    console.log(result);
    let buildTheHtmlOutput = "<li>";
    buildTheHtmlOutput += "<h2>" + result.title + "</h2>";
    buildTheHtmlOutput += "<p>" + result.description + "</p>";
    buildTheHtmlOutput += "<a href='" + result.url + "' target='_blank'>";
    buildTheHtmlOutput += "<p> Start date: " + result.start_time + "</p>";
    buildTheHtmlOutput += "<p> Location: " + result.venue_name + "</p>";
    if ((result.image) && (result.image != "") && (result.image != undefined)) {
        buildTheHtmlOutput += "<img src='" + result.image.thumb.url + "'/>";
    }
    buildTheHtmlOutput += "</a>";
    buildTheHtmlOutput += "</li>";
    //use the HTML output to show it in the index.html
    $(".results").append(buildTheHtmlOutput);
}
$(getEventful);
