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

// breaking out query string into its params

// var endpoint = 'https://api.seatgeek.com/2/events?'; // maybe turn into an array so that VENUES or PERFORMERS or EVENTS endpoint can be chosen
// var client_id = 'client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';
// var locationIP = '&geoip=true'; // need to add an if/else for possible zipCode use here. make IP address use default.
// var locationZip = '&geoip=' + zipUserInput; // pass location user input here for zipCode
// var range = '&range=' + rangeUserInput + miOrKm;
// var resultsPerPage = '&per_page=' + resultsPerPageUserInput;
// var pageNumber = '&page=' + resultsPageNumber;
// var performerSelection = '&performers.slug=' + performerUserInput;
// // query string concatenated
// var urlString = endpoint + client_id + (locationIP || locationZip) + range + resultsPerPage + pageNumber + performerSelection;
// })
// $.ajax({
// url: 'https://api.seatgeek.com/2/events?client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA&geoip=true&range=25mi&per_page=25&page=1&performers.slug=los-angeles-kings', // make this = urlString later
// method: 'GET',
// }).done(function(data) {
// console.log(data);
// });


var APIEndpoint = 'https://api.seatgeek.com/2';

var eventsEndpoint = '/events';
var performersEndpoint = '/performers';
var venuesEndpoint = '/venues';

var venueCityParameter = 'venue.city='
var citySearch = '&q=rockford'

var genre = 'genres.slug=';



var concertTaxonomy = '&taxonomies.name=concert'
var client_id = '&client_id=MTAyNzk5MDR8MTUxNTg4MDMzMi4wOA';

https://api.seatgeek.com/2/performers?genres.slug=rock

 
var eventsURL = APIEndpoint + eventsEndpoint + '?' + venueCityParameter + 'los+angeles' + concertTaxonomy + client_id;

// var performersURL = APIEndpoint + performersEndpoint + 'q=kygo' + concertTaxonomy + client_id;
var performersRapURL = APIEndpoint + performersEndpoint + '?' + genre + 'rap' + client_id;
var performersRockURL = APIEndpoint + performersEndpoint + '?' + genre + 'rock' + client_id;
var performersPopURL = APIEndpoint + performersEndpoint + '?' + genre + 'pop' + client_id;
var performersCountryURL = APIEndpoint + performersEndpoint + '?' + genre + 'country' + client_id;

$.ajax({
    url: eventsURL,
    method: 'GET',
}).done(function(data) {
    // console.log(data);
    for (i = 0; i < data.events.length; i++) { 
        var result = $("<div>");
        result.addClass("card col-sm-5 results-card");
        
        var header = $("<h5>");
        header.addClass("event-title");
        header.text(data.events[i].title);
        
        var p = $("<p>");
        p.addClass("event-info");
        p.text("Paragraph Placeholder");
        
        var link = $("<a>");
        link.attr("href", data.events[i].venue.url);
        link.attr("target", "_blank");
        link.addClass("btn btn-primary");
        link.text("More Info");

        result.append(header);
        result.append(p);
        result.append(link);

        $("#music-results").append(result)



        // <!-- Results card for JS to print -->
        // <!-- <div id="resultsCard" class="card col-sm-5">
        //   <div class="card-body">
        //       <h5 class="event-title">Event Name</h5>
        //       <p class="event-info">With supporting text below as a natural lead-in to additional content.</p>
        //     <a href="#" class="btn btn-primary">More Info</a>
        //   </div>
        // </div> -->
        
        

        // $("#resultsCard").append("<div>").addClass("card-body");

        // $(".card-body").append("<h5>").addClass("event-title");
        // $(".event-title").append(data.events[i].title); 


        
        
        // $("#main-page-results").append(data.events[i].title);   
        // $("#main-page-results").append("<br>");   

        // $("#main-page-results").append(data.events[i].venue.name);   
        // $("#main-page-results").append("<br>");  
        
        // $("#main-page-results").append(data.events[i].venue.address); 
        // $("#main-page-results").append(data.events[i].venue.display_location); 
        // $("#main-page-results").append("<br>");   
        // $("#main-page-results").append(data.events[i].venue.url); 
        
        // $("#main-page-results").append("<br>");  
        // $("#main-page-results").append("<br>");   
    }
});


// $.ajax({
//     url: eventsURL,
//     method: 'GET',
// }).done(function(data) {
//     console.log(data);
//     for (i = 0; i < data.events.length; i++) { 
//         console.log(data.events[i].title);
//         // console.log(data.events[i].venue);     
//         $("#main-page-results").append(data.events[i].title);   
//         $("#main-page-results").append("<br>");   

//         $("#main-page-results").append(data.events[i].venue.name);   
//         $("#main-page-results").append("<br>");  
        
//         $("#main-page-results").append(data.events[i].venue.address); 
//         $("#main-page-results").append(data.events[i].venue.display_location); 
//         $("#main-page-results").append("<br>");   
//         $("#main-page-results").append(data.events[i].venue.url); 
        
//         $("#main-page-results").append("<br>");  
//         $("#main-page-results").append("<br>");   
//     }
// });

// $.ajax({
//     url: 'https://api.seatgeek.com/2/performers?genres.slug=rock' + client_id,
//     method: 'GET',
// }).done(function(data) {
//     console.log(data);

    // $("#main-page-results").append(data.events[i].title);   
    
// });

// $.ajax({
//     url: 'https://api.seatgeek.com/2/events?q=boston+celtics',
//     method: 'GET',
// }).done(function(data) {
//     console.log(data);
// });
