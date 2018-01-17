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
!!!sorting - review docs & add later - sort by date, etc. .asc/.desc for ascending/descending
!!!filtering - review docs & add later - sort by price, etc.
notes about returned data object: 'The Events Response Document' section has all details
VENUES Endpoint = https://api.seatgeek.com/2/venues
PERFORMERS Endpoint = https://api.seatgeek.com/2/performers
can be used to get performer info. links to spotify/lastFM, etc.
*/

var rangeUserInput = 0; // get this val from an input box
var zipUserInput = 00000; // for zip code entry from input box
var miOrKm = ''; // mi or km for range units
var resultsPerPageUserInput = 0; // allow user to select how many results per page? or maybe just set a default to keep page formatting to a known value / ease of styling
var resultsPageNumber = 1; // start @ 1 then have some way to change later
var performerUserInput = ''; // implement a way to add multiple performers later, like the movie search classwork/giphy wall hw

// breaking out query string into it's constituent params
var endpoint = 'https://api.seatgeek.com/2/events?'; // maybe turn into an array so that VENUES or PERFORMERS or EVENTS endpoint can be chosen
var client_id = 'client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';
var locationIP = '&geoip=true'; // need to add an if/else for possible zipCode use here. make IP address use default.
var locationZip = '&geoip=' + zipUserInput; // pass location user input here for zipCode
var range = '&range=' + rangeUserInput + miOrKm;
var resultsPerPage = '&per_page=' + resultsPerPageUserInput;
var pageNumber = '&page=' + resultsPageNumber;
var performerSelection = '&performers.slug=' + performerUserInput;

// query string concatenated
var urlString = endpoint + client_id + (locationIP || locationZip) + range + resultsPerPage + pageNumber + performerSelection;

$.ajax({
    url: 'https://api.seatgeek.com/2/events?client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA&geoip=true&range=25mi&per_page=25&page=1&performers.slug=los-angeles-kings',
    method: 'GET',
}).done(function(data) {
    console.log(data);
});
