//define default gps coordinates for New York
let lat = "40.730610";
let long = "-73.935242";

function getTicketmaster() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function saveLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    //    getTicketmasterApi(lat, long);
}

function getTicketmasterApi(locationInput, keywordInput) {
    /* Update all the parameters for your API test*/
    var params = {
        apikey: 'gTqUrGAhPVOo80W5dwim0PACPObENQ0h',
        keyword: keywordInput,
        city: locationInput,
        within: 25,
    };
    var result = $.ajax({
            /* update API end point */
            url: 'https://app.ticketmaster.com/discovery/v2/events?&countryCode=US',
            data: params,
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })

        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            if (result.page.totalElements == 0) {
                alert("No Results Found")
            } else {
                displayTicketmaster(result)
            }
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayTicketmaster(data) {
    console.log('In displayEventful');
    console.log(data); // NOTE - PROGRAM THROWS ERROR BEFORE THIS POINT, SO HAVEN'T VIEWED OUTPUT
    $("#result-list ul").html("");
    const results = data._embedded.events.map((item, index) => renderTicketmaster(item)); // THIS NEEDS TO BE EDITED ONCE I CAN SEE THE OBJECT
}

function renderTicketmaster(result) {
    console.log(result);
    let buildTheHtmlOutput = "<li>";
    buildTheHtmlOutput += "<h2>" + result.name + "</h2>";
    buildTheHtmlOutput += "<a href='" + result.url + "' target='_blank'>";
    buildTheHtmlOutput += "<p> Start date: " + result.dates.start.localDate + "</p>";
    buildTheHtmlOutput += "<p> Location: " + result._embedded.venues[0].name + "</p>";
    if ((result.images[0].url) && (result.images[0].url != "") && (result.images[0].url != undefined)) {
        buildTheHtmlOutput += "<img id='eventImages' src='" + result.images[0].url + "'/>";
    }
    buildTheHtmlOutput += "</a>";
    buildTheHtmlOutput += "</li>";
    //use the HTML output to show it in the index.html
    $("#result-list ul").append(buildTheHtmlOutput);
}


$(document).ready(function () {
    //do stuff
    $('main').hide();
    $('.landing-page').show();

});

//when clicking on explore button the page shows results container but not the results on it's own.
$(document).on('click', '.button', function (event) {
    event.preventDefault();
    $('main').hide();
    $('.search-results').show();
    $('#result-list').hide();

});


//on search button click inside the form we show results container and the results in a row.
$(document).submit('#search-form', function (event) {
    event.preventDefault();
    $('main').hide();
    $('.search-results').show();
    $('#result-list').show();
    const locationInput = $("#location-value").val();
    const keywordInput = $("#keyword-value").val();
    if (locationInput == "") {
        alert("Please specify a location")
    } else if (keywordInput == "") {
        alert("Please specify a keyword")
    } else {
        console.log(locationInput, keywordInput, );
        $(".half-column").removeClass("background-image");
        getTicketmasterApi(locationInput, keywordInput);
    }
});
