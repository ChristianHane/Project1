// seatGeek API action
// when a sport type button is clicked...
$('.sportButton').on('click', function (event) {

  event.preventDefault();

  $('#sports-results-display-zone').empty();

  var selectedTaxonomy = $(this).val();
  console.log('sportTaxonomy clicked = ' + selectedTaxonomy);

  var lat = '&lat=' + localStorage.getItem('lat');
  var lon = '&lon=' + localStorage.getItem('lng');
  var endpoint = 'https://api.seatgeek.com/2/events';
  var client_id = '?client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';
  var range = '&range=100mi';
  var sportType = '&taxonomies.name=' + selectedTaxonomy;

  var queryString = endpoint + client_id + lat + lon + range + sportType;
  console.log('queryString = ' + queryString);

  // get seatGeek data
  $.ajax({
    url: queryString,
    method: 'GET',
  }).done(function (response) {

    var sportsEvents = response.events;
    console.log(sportsEvents);

    // loop thru events & make a card displaying important info for each event - venue, date/time, link to buy tix, etc.
    for (var i = 0; i < sportsEvents.length; i++) {

      var result = $('<div>');
      result.addClass('card col-sm-5 results-card');

      var resultHeader = $('<h5>');
      resultHeader.addClass = ('event-title');
      resultHeader.text(sportsEvents[i].title);

      // get time of event & format using moment.js
      var eventTime = sportsEvents[i].datetime_local;
      var eventTimeConverted = moment(eventTime).format('hh:mma, MM-DD-YYYY');

      var resultBody = $('<p>');
      resultBody.addClass('event-info');
      resultBody.append('<p>' + '<b>' + 'Event Type: ' + '</b>' + sportsEvents[i].type + '</p>');
      resultBody.append('<p>' + '<b>' + 'Local Start Time: ' + '</b>' + eventTimeConverted + '</p>');
      resultBody.append('<p>' + '<b>' + 'Venue Name: ' + '</b>' + sportsEvents[i].venue.name + '</p>');
      resultBody.append('<p>' + '<b>' + 'Address: ' + '</b>' + sportsEvents[i].venue.address + '\, ' + sportsEvents[i].venue.extended_address + '</p>');
      resultBody.append('<p>' + '<b>' + 'Lowest Price: ' + '</b>' + '\$' + sportsEvents[i].stats.lowest_price + '</p>');

      var resultLink = $('<a>');
      resultLink.attr('href', sportsEvents[i].url);
      resultLink.addClass('btn btn-primary');
      resultLink.text('Buy Tickets on SeatGeek!');
      resultLink.attr('target', '_blank');

      result.append(resultHeader);
      result.append(resultBody);
      result.append(resultLink);

      $('#sports-results-display-zone').append(result);
    }
  });
});

$(document).ready(function () {
  $('#cityHeader').text(localStorage.getItem('location'))
});
