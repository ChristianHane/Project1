$("#search-butt").on("click", function(event) {
    event.preventDefault();
    var lat = localStorage.getItem("lat");
    var lng = localStorage.getItem("lng");
    var radius = $("#radius").val();

    console.log(lat);
    console.log(lng);
    var trailsURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + search + "&location=42.3675294,-71.186966&radius=5000&key=AIzaSyBBx-fTMyEih3dDWIEQIVOkSYPYT0G8Sss";
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
})


