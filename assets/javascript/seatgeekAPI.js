// seat geek API action
/*
notes about query string params:
EVENTS Endpoint = https://api.seatgeek.com/2/events
client_id=clientID, like API-key
geoip=true is to use ip address geographic location, or zip code
range= is to find results w/i ##mi radius. can use '##km' for km range. default is 30mi
per_page= is results per page set to number used
page=1 is page to show, it is 1-indexed. can change this to flip thru results
performers.slug=name-of-band-or-team-etc is to search performer(s) - can be used multiple times & can be either .id= or .slug= style in same query
venue.(keys from venues)
taxonomies param uses same modifiers as taxonomies endpoint
!!!sorting - review docs & add later - sort by date, etc. .asc/.desc for ascending/descending
!!!filtering - review docs & add later - sort by price, etc.
notes about returned data object: 'The Events Response Document' section has all details
VENUES Endpoint = https://api.seatgeek.com/2/venues
PERFORMERS Endpoint = https://api.seatgeek.com/2/performers
can be used to get performer info. links to spotify/lastFM, etc.
*/

// var rangeUserInput = 0; // get this val from an input box
// var zipUserInput = 00000; // for zip code entry from input box
// var miOrKm = ''; // mi or km for range units
// var resultsPerPageUserInput = 0; // allow user to select how many results per page? or maybe just set a default to keep page formatting to a known value / ease of styling
// var resultsPageNumber = 1; // start @ 1 then have some way to change later
// var performerUserInput = ''; // implement a way to add multiple performers later, like the movie search classwork/giphy wall hw

// $('searchButton').on('click', function(event) {
//   event.preventDefault();

//   // breaking out query string into it's constituent params
//   var endpoint = 'https://api.seatgeek.com/2/events?'; // maybe turn into an array so that VENUES or PERFORMERS or EVENTS endpoint can be chosen
//   var client_id = 'client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';
//   var locationIP = '&geoip=true'; // need to add an if/else for possible zipCode use here. make IP address use default.
//   var locationZip = '&geoip=' + zipUserInput; // pass location user input here for zipCode
//   var range = '&range=' + rangeUserInput + miOrKm;
//   var resultsPerPage = '&per_page=' + resultsPerPageUserInput;
//   var pageNumber = '&page=' + resultsPageNumber;
//   var performerSelection = '&performers.slug=' + performerUserInput;

//   // query string concatenated
//   var urlString = endpoint + client_id + (locationIP || locationZip) + range + resultsPerPage + pageNumber + performerSelection;
// })

// everything above here is nasty
/*
$('.sport-button').on('click', function(event) {
  event.preventDefault();

  var endpoint = 'https://api.seatgeek.com/2/events';
  var client_id = '?client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';
  //var location = get lat/lon vars from firebase
  var range = '&range=25mi'; //change to get user input - var range = '&range=' + rangeUserInput + miOrKm;
  //var performerSelection = '&performers.slug=' + performerUserInput;
  var sportType = '&taxonomies.name=' + $(this).val();
  console.log(sportType);

  var queryString = endpoint + client_id + '&geoip=true' + range + sportType;
  console.log(queryString);
  // just to test actually posting stuff to sports.html page
  // need to rework this to incorporate user input into queryString
  // just using LA Kings tester query for now
  // posting to page successfully - not pretty lookin though */
  $.ajax({
    // make this = urlString later
    url: 'https://api.seatgeek.com/2/events?client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA&geoip=true&range=25mi&per_page=25&page=1&taxonomies.name=tennis', //performers.slug=los-angeles-kings
    method: 'GET',
  }).done(function(response) {
    console.log(response);
    var sportsEvents = response.events;
    console.log(sportsEvents);

    for(var i = 0; i < sportsEvents.length; i++) {

      var result = $('<div>');
      result.addClass('card col-sm-5 results-card');
      
      var resultHeader = $('<h5>');
      resultHeader.addClass = ('event-title');
      resultHeader.text(sportsEvents[i].title);

      var eventTime = sportsEvents[i].datetime_local;
      console.log(eventTime);
      var eventTimeConverted = moment(eventTime).format('hh:mma, MM-DD-YYYY');
      console.log(eventTimeConverted);

      var resultBody = $('<p>');
      resultBody.addClass('event-info');
      resultBody.append('<p>' + '<br>' + 'Event Type: ' + sportsEvents[i].type + '</p>');
      resultBody.append('<p>' + 'Local Start Time: ' + eventTimeConverted + '</p>');
      resultBody.append('<p>' + 'Venue Name: ' + sportsEvents[i].venue.name + '</p>');
      resultBody.append('<p>' + 'Address: ' + sportsEvents[i].venue.address + '\, ' + sportsEvents[i].venue.extended_address + '</p>');
      //resultBody.append('<p>' + 'Location lat: ' + sportsEvents[i].venue.location.lat + '\, lon: ' + sportsEvents[i].venue.location.lon + '</p>');
      resultBody.append('<p>' + 'Lowest Price: \$' + sportsEvents[i].stats.lowest_price + '</p>');

      var resultLink = $('<a>');
      resultLink.attr('href', sportsEvents[i].url);
      resultLink.addClass('btn btn-primary');
      resultLink.text('Buy Tickets on SeatGeek!');
      resultLink.attr('target', '_blank');

      result.append(resultHeader);
      result.append(resultBody);
      result.append(resultLink);

      $('#sports-results-display-zone').append(result);

    /* var sportsInfo = $('<p>');
    // remove <br> later & just style w/ CSS
    sportsInfo.append('<p>' + '<br>' + 'Event Type: ' + sportsEvents[i].type + '</p>');
    sportsInfo.append('<p>' + 'Event: ' + sportsEvents[i].title + '</p>');
    sportsInfo.append('<p>' + 'Local Start Time: ' + eventTimeConverted + '</p>');
    sportsInfo.append('<p>' + 'Venue Name: ' + sportsEvents[i].venue.name + '</p>');
    sportsInfo.append('<p>' + 'Address: ' + sportsEvents[i].venue.address + '\, ' + sportsEvents[i].venue.extended_address + '</p>');
    sportsInfo.append('<p>' + 'Location lat: ' + sportsEvents[i].venue.location.lat + '\, lon: ' + sportsEvents[i].venue.location.lon + '</p>');
    sportsInfo.append('<p>' + 'Lowest Price: \$' + sportsEvents[i].stats.lowest_price + '</p>');
    sportsInfo.append('<a href="' + sportsEvents[i].url + '">Click Here to Buy Tickets on SeatGeek</a>');
    $('#sports-results-display-zone').append(sportsInfo);
    console.log(sportsInfo); */
  }
  });
//});

$(document).ready(function() {
  $('#cityHeader').text(localStorage.getItem('location'))
});
