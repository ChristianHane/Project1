// trailAPI action
/*
notes on query string params:
limit=25 - how many results to return
q[activities_activity_type_name_eq]=hiking - searches by activity, not sure what the options are.
q[city_cont]=Los+Angeles - the city to search for
q[state_cont]=California - state to search in
radius=25 - radius to search in, value in miles
*/
$.ajax({
    url: 'https://trailapi-trailapi.p.mashape.com/?limit=25&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Los+Angeles&q[state_cont]=California&radius=25',
    method: 'GET',
    headers: {
        'X-Mashape-Key': 'kxaa71ARPxmshqwGoA6fOcXu8ChDp1RDh9XjsnIo1otQQoB3nF',
        'Accept': 'text/plain'
    }
}).done(function(data) {
    console.log(data);
});
