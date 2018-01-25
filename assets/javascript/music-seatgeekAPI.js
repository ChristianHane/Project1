// seatGeek music action
var APIEndpoint = 'https://api.seatgeek.com/2';

var eventsEndpoint = '/events';
var performersEndpoint = 'performers';
var venuesEndpoint = '/venues';

var venueCityParameter = 'venue.city='
var citySearch = '&q=rockford'

var genre = 'genres.slug=';
var concertTaxonomy = '&taxonomies.name=concert';

var lat = '&lat=' + localStorage.getItem('lat');
var lon = '&lon=' + localStorage.getItem('lng');
var perPage = '&per_page=50'

var client_id = '&client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';

var eventsURL = APIEndpoint + eventsEndpoint + '?' + venueCityParameter + lat + lon + perPage + concertTaxonomy + client_id;

// 'https://api.seatgeek.com/2/events?performers&genres.slug=rock'

// apiURL: genre & city
var alternativeURL = APIEndpoint + eventsEndpoint + '?' + performersEndpoint + '&' + genre + 'alternative' + client_id;
var bluesURL = APIEndpoint + performersEndpoint + '?' + genre + 'blues' + client_id;
var classicalURL = APIEndpoint + performersEndpoint + '?' + genre + 'classical' + client_id;
var electronicURL = APIEndpoint + performersEndpoint + '?' + genre + 'electronic' + client_id;
var folkURL = APIEndpoint + performersEndpoint + '?' + genre + 'folk' + client_id;
var hiphopURL = APIEndpoint + performersEndpoint + '?' + genre + 'hip-hop' + client_id;
var jazzURL = APIEndpoint + performersEndpoint + '?' + genre + 'jazz' + client_id;
var latinURL = APIEndpoint + performersEndpoint + '?' + genre + 'latin' + client_id;
var punkURL = APIEndpoint + performersEndpoint + '?' + genre + 'punk' + client_id;
var rockURL = APIEndpoint + performersEndpoint + '?' + genre + 'rock' + client_id;
var reggaeURL = APIEndpoint + performersEndpoint + '?' + genre + 'reggae' + client_id;
var soulURL = APIEndpoint + performersEndpoint + '?' + genre + 'soul' + client_id;
var technoURL = APIEndpoint + performersEndpoint + '?' + genre + 'techno' + client_id;

// var performersURL = APIEndpoint + performersEndpoint + 'q=kygo' + concertTaxonomy + client_id;

$.ajax({
  url: eventsURL,
  method: 'GET',
}).done(function (data) {

  console.log(data);

  for (i = 0; i < data.events.length; i++) {
    var result = $("<div>");
    result.addClass("card col-sm-5 results-card");

    var header = $("<h5>");
    header.addClass("event-title");
    header.text(data.events[i].title);

    var p = $("<p>");
    p.addClass("event-info");
    p.append(data.events[i].performers[0].name);
    p.append("<br>")
    p.append(data.events[i].venue.name);
    p.append("<br>")
    p.append(data.events[i].venue.address);
    p.append("<br>")
    p.append(data.events[i].venue.display_location);

    var link = $("<a>");
    link.attr("href", data.events[i].venue.url);
    link.attr("target", "_blank");
    link.addClass("btn btn-primary");
    link.text("More Info");

    result.append(header);
    result.append(p);
    result.append(link);

    $("#music-results").append(result)
  }
});

$(document).ready(function () {
  $('#cityHeader').text(localStorage.getItem('location'))
});
