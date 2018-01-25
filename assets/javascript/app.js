var database;

// var userLocation;

//  navigator.geolocation.getCurrentPosition(function(location) {
//     console.log('GOT LOCATION');
//     var latitude = location.coords.latitude;
//     var longitude = location.coords.longitude;
//     userLocation = new google.maps.LatLng(latitude,longitude);
// }, function(err) {
//     console.log(err);
// }, {
//     timeout: 10000
// });

$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAaeV0UKgKCyxqybax2UDg3mbxkO2Hujn8",
        authDomain: "project-1-things-to-do.firebaseapp.com",
        databaseURL: "https://project-1-things-to-do.firebaseio.com",
        projectId: "project-1-things-to-do",
        storageBucket: "project-1-things-to-do.appspot.com",
        messagingSenderId: "1055885943744"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    //user create account with email
    //submit = Join Now button 
    $("#register-submit").on("click", function(event){
        event.preventDefault();
        var email= $("#email").val();
        var password= $("#password").val();
        var repeatPassword = $("#repeat-password").val();
        if(password === repeatPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(user){
                console.log(user);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    })
    
    //user login with email
    $("#sign-in-submit").on("click", function(){
        event.preventDefault();    
        var email = $("#sign-in-email").val();
        var password = $("#sign-in-password").val();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user){
            console.log(user);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            console.log(errorCode);
            // ...
        });
    });

    // google login
    $("#sign-in-google").on("click", function() {
        var provider = new firebase.auth.GoogleAuthProvider();        
        firebase.auth().signInWithRedirect(provider);
    });

    //facebook login
    $("#sign-in-fb").on("click", function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    });

    //sign out
    $("#sign-out").on("click", function(){
        event.preventDefault();    
        firebase.auth().signOut().then(function() {
            // console.log("signed out!");
            $(".display-user").empty();  
        }).catch(function(error) {
            console.log("something happened with sign out.");
        });
    });

    //listens for changes to user sign in status
    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {   
            $(".display-user").empty();            
            $(".display-user").text(user.displayName);  
        } else{
            $(".display-user").text();                        
            console.log("no user!");
        }
    });

    //for api calls to user sign in methods
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        console.log(result);
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

$("#searchButton").on("click", function(event) {
    event.preventDefault();
    var cityState = $("#searchEvents").val();
    $("#searchEvents").val("");

    $("#no-results").empty();
    $("#searchEvents").val()
    console.log(cityState);
    var location;

    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityState + "&key=AIzaSyBziF4Fc3JyyFZY3LJ0gOEOtV7W1fqZcpk";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(data) {
        console.log(data);

        if(data.status === "ZERO_RESULTS"){
            $("#no-results").text("Sorry no results were found, please try agian.");
            console.log("Sorry no results were found, please try agian.");
        } else{
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            location = data.results[0].address_components[0].long_name;
            
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("location", location);
                localStorage.setItem("lat", lat);
                localStorage.setItem("lng", lng);
            } else {
                // Sorry! No Web Storage support..
            }
            console.log(lat);
            console.log(lng);
           
        }

        

        $('#cityHeader').text(location)

    });

    $("#optionsContent").css({"display": "initial", "background-color": "#000000", "padding": "30px"});
    $('html, body').animate({
        scrollTop: $("#optionsContent").offset().top
      }, 1000);
});

// Dropdown menu
$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    // Avoid following the href location when clicking
    event.preventDefault(); 
    // Avoid having the menu to close when clicking
    event.stopPropagation(); 
    // If a menu is already open we close it
    //$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
    // opening the one you clicked on
    $(this).parent().addClass('open');

    var menu = $(this).parent().find("ul");
    var menupos = menu.offset();
  
    if ((menupos.left + menu.width()) + 30 > $(window).width()) {
        var newpos = - menu.width();      
    } else {
        var newpos = $(this).parent().width();
    }
    menu.css({ left:newpos });

});
