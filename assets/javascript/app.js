var database;
// localStorage.clear();
// var userLocation = localStorage.getItem("location");
// console.log(userLocation);
// if (userLocation === undefined) {
//     navigator.geolocation.getCurrentPosition(function(location) {
//         $("#searchEvents").attr("placeholder", "Got location");   
//         $("#searchEvents").attr("disabled", false);                 
//         localStorage.clear();
//         console.log(location);
//         console.log('GOT LOCATION');
//         var latitude = location.coords.latitude;
//         var longitude = location.coords.longitude;
//         localStorage.setItem("location", "defined");
//         localStorage.setItem("lat", latitude);
//         localStorage.setItem("lng", longitude);
//     }, function(err) {
//         if(err.message === "User denied Geolocation") {
//             $("#searchEvents").attr("placeholder", "City/State");
//             $("#searchEvents").attr("disabled", false);        
//             console.log("denied");
//         }
//         console.log(err);
//     });
// }

$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBSRyLZcUwZCqIcBvv3GP2ltQ7RA_uQRTU",
        authDomain: "test-for-auth-78f1a.firebaseapp.com",
        databaseURL: "https://test-for-auth-78f1a.firebaseio.com",
        projectId: "test-for-auth-78f1a",
        storageBucket: "",
        messagingSenderId: "459604740117"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    //user create account with email
    //submit = Join Now button 
    $("#submit").on("click", function(event){
        event.preventDefault();
        var email= $("#email").val();
        var password= $("#create-password").val();
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
    $("#sign-in").on("click", function(){
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
    $("#google").on("click", function() {
        var provider = new firebase.auth.GoogleAuthProvider();        
        firebase.auth().signInWithRedirect(provider);
    });

    //facebook login
    $("#facebook").on("click", function() {
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
            var location = data.results[0].formatted_address;
            
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
    });
});