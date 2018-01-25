// google places outdoor action
$(".outdoors-option").on("click", function (event) {

  event.preventDefault();
  var lat = localStorage.getItem("lat");
  var lng = localStorage.getItem("lng");

  var pyrmont = new google.maps.LatLng(lat, lng)
  var query = $(this).val();

  console.log("made it")

  service = new google.maps.places.PlacesService(document.getElementById("list-places"));
  service.textSearch({
    query: query,
    radius: 1000,
    location: pyrmont,
  }, function (data, status) {

    console.log(data);
    console.log(status);

    for (var i = 0; i < data.length; i++) {
      var result = $("<div>");
      result.addClass("card col-sm-5 results-card");

      var header = $("<h5>");
      header.addClass("event-title");
      header.text(data[i].name);

      var p = $("<p>");
      p.addClass("event-info");
      p.text(data[i].formatted_address);

      var p2 = $("<p>");
      p2.addClass("event-info");
      p2.text(data[i].rating);

      var link = $("<a>");
      link.attr("href", "https://www.google.com/maps/place/" + data[i].name);
      link.addClass("btn btn-primary");
      link.html("More Info");

      result.append(header);
      result.append(p);
      result.append(p2);
      result.append(link);

      $("#list-places").append(result);
    }
  });
});

$(document).ready(function () {
  $('#cityHeader').text(localStorage.getItem('location'));
  $('#cityResults').text(localStorage.getItem('location'));
  $('html, body').animate({
    scrollTop: $(".results-content").offset().top
  }, 1000);
});
