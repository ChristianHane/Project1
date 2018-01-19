$.ajax({
    url: 'https://www.eventbriteapi.com/v3/events/search/?location.address=%22city%22%3A+%22Los+Angeles%22&token=4D4RH3LLLOP4PUBKHPXA',
    method: 'GET',
}).done(function(data) {
    console.log(data);
});
