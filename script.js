/*--- Step 1 - Defining global variables ---*/

/*--- Step 2 - Defining functions ---*/

/*--- Step 3 - Using functions ---*/
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
    $(function () {
        $("#date-value").datepicker();
    });

});


//on search button click inside the form we show results container and the results in a row.
$(document).submit('#search-form', function (event) {
    event.preventDefault();
    $('main').hide();
    $('.search-results').show();
    $('#result-list').show();
    const locationInput = $("#location-value").val();
    const keywordInput = $("#keyword-value").val();
    const dateInput = $("#date-value").val();

    console.log(locationInput, keywordInput, dateInput)

    //define default gps coordinates for New York
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
            keywords: keywordInput,
            location: lat + ',' + long,
            date: dateInput,
            within: 25,
        };

        var result = $.ajax({
                /* update API end point */
                url: "https://api.eventful.com/json/events/search",
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
    //    function getEventfulApi(lat, long) {
    //        /* Update all the parameters for your API test*/
    //        var params = {
    //            //key: "gTqUrGAhPVOo80W5dwim0PACPObENQ0h",
    //            keyword: keywordInput,
    //            location: lat + ',' + long,
    //            dates: dateInput,
    //            distance: 5,
    //        };
    //        var result = $.ajax({
    //                /* update API end point */
    //                url: "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=gTqUrGAhPVOo80W5dwim0PACPObENQ0h",
    ////                data: params,
    //                dataType: "json",
    //                /*set the call type GET / POST*/
    //                type: "GET",
    //                async: true
    //            })
    //            .done(function (result) {
    //                /* if the results are meeningful, we can just console.log them */
    //                console.log(result);
    //                displayEventful(result);
    //            })
    //            /* if the call is NOT successful show errors */
    //            .fail(function (jqXHR, error, errorThrown) {
    //                console.log(jqXHR);
    //                console.log(error);
    //                console.log(errorThrown);
    //            });
    //    }

    function displayEventful(data) {
        console.log('In displayEventful');
        console.log(data); // NOTE - PROGRAM THROWS ERROR BEFORE THIS POINT, SO HAVEN'T VIEWED OUTPUT
        const results = data.events.event.map((item, index) => renderEventful(item)); // THIS NEEDS TO BE EDITED ONCE I CAN SEE THE OBJECT
    }

    function renderEventful(result) {
        console.log(result);
        let buildTheHtmlOutput = "<li>";
        buildTheHtmlOutput += "<h2>" + result.title + "</h2>";
        if (result.description == null) {
            console.log("this is where the problem is")
        } else {
            buildTheHtmlOutput += "<p>" + result.description.replace(/<p>,</p > , < br > , < \/br>/g, '') + "</p>";
        }
        buildTheHtmlOutput += "<a href='" + result.url + "' target='_blank'>";
        buildTheHtmlOutput += "<p> Start date: " + result.start_time + "</p>";
        buildTheHtmlOutput += "<p> Location: " + result.venue_name + "</p>";
        if ((result.image) && (result.image != "") && (result.image != undefined)) {
            buildTheHtmlOutput += "<img src='" + result.image.thumb.url + "'/>";
        }
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
        //use the HTML output to show it in the index.html
        $("#result-list ul").append(buildTheHtmlOutput);
    }
    $(getEventful);
});
