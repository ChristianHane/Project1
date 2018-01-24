// $("#search-butt").on("click", function(event) {
//     event.preventDefault();
//     var lat = localStorage.getItem("lat");
//     var lng = localStorage.getItem("lng");
//     var radius = $("#radius").val();

//     console.log(lat);
//     console.log(lng);
//     var trailsURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + search + "&location=42.3675294,-71.186966&radius=5000&key=AIzaSyBBx-fTMyEih3dDWIEQIVOkSYPYT0G8Sss";
//     $.ajax({
//         url: trailsURL,
//         method: 'GET',
//         headers: {
//             'X-Mashape-Key': 'kxaa71ARPxmshqwGoA6fOcXu8ChDp1RDh9XjsnIo1otQQoB3nF',
//             'Accept': 'text/plain'
//         }
//     }).done(function(response) {
//         console.log(response);
//         console.log(response.places.length);
//         var places = response.places;
//         for(var i = 0; i < places.length; i++){
//             var newItem = $("<p>");
//             newItem.append("<p>" + places[i].city + "</p>");
//             newItem.append("<p>" + places[i].name + "</p>");
//             newItem.append("<p>" + places[i].activities[0].activity_type_name + "</p>");
//             newItem.append("<p>" + places[i].activities[0].length + " miles</p>");
//             newItem.append("<p>" + places[i].activities[0].description + "</p>");
//             // newItem.append("<img>" + pla)
//             newItem.append("<a href='" + places[i].activities[0].url + "'>more info</a>");
//             $("#list-places").append(newItem);
//             console.log(newItem);
//         }
//     });

    
// })

$(".outdoors-option").on("click", function(event) {

    event.preventDefault();
    var lat = localStorage.getItem("lat");
    var lng = localStorage.getItem("lng");

    var pyrmont = new google.maps.LatLng(lat,lng)
    var query = $(this).val();
    // $("#search").val();
    console.log("made it")
    service = new google.maps.places.PlacesService(document.getElementById("list-places"));
    service.textSearch({
        query: query,
        radius: 1000,
        location: pyrmont,
    }, function(data, status) {
        console.log(data);
        console.log(status);
        for(var i = 0; i < data.length; i++) {
            var newDiv = $("div")
            newDiv.append("<p>" + data[i].name + "</p>");
            newDiv.append("<p>" + data[i].formatted_address + "</p>");
            newDiv.append("<p>Rating " + data[i].rating + "</p>");
            newDiv.append("<a target='_blank' href='https://www.google.com/maps/place/" + data[i].formatted_address + "'>learn more</a>");
            $("#list-places").append(newDiv);
        }
    });
})
