// trailAPI action
/*
notes on query string params:
limit=25 - how many results to return
q[activities_activity_type_name_eq]=hiking - searches by activity, not sure what the options are.
q[city_cont]=Los+Angeles - the city to search for
q[state_cont]=California - state to search in
radius=25 - radius to search in, value in miles
*/
// activities: hiking, mountain biking,

$("#search-butt").on("click", function(event) {
    event.preventDefault();
    var search;
    var lat;
    var lng;
    var radius = $("#radius").val();
    search = $("#search").val();
    console.log(search);
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=AIzaSyBziF4Fc3JyyFZY3LJ0gOEOtV7W1fqZcpk";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(data) {
        console.log(data);
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        console.log(lat);
        console.log(lng);
        var trailsURL = "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&lon=" + lng + "&limit=25&q[activities_activity_type_name_eq]=hiking&radius=" + radius;
        $.ajax({
            url: trailsURL,
            method: 'GET',
            headers: {
                'X-Mashape-Key': 'kxaa71ARPxmshqwGoA6fOcXu8ChDp1RDh9XjsnIo1otQQoB3nF',
                'Accept': 'text/plain'
            }
        }).done(function(response) {
            console.log(response);
            console.log(response.places.length);
            var places = response.places;
            for(var i = 0; i < places.length; i++){
                var newItem = $("<p>");
                newItem.append("<p>" + places[i].city + "</p>");
                newItem.append("<p>" + places[i].name + "</p>");
                newItem.append("<p>" + places[i].activities[0].activity_type_name + "</p>");
                newItem.append("<p>" + places[i].activities[0].length + " miles</p>");
                newItem.append("<p>" + places[i].activities[0].description + "</p>");
                // newItem.append("<img>" + pla)
                newItem.append("<a href='" + places[i].activities[0].url + "'>more info</a>");
                $("#list-places").append(newItem);
                console.log(newItem);
            }
        });  
    });
})


