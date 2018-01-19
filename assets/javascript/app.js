var database = firebase.database();

// $("#register-button").on("click", function(){
//     var newUser = {
//         userName: $("#username").val(),
//         firstName: $("#first-name").val(),
//         lastName: $("#last-name").val(),
//         email: $("#email").val(),
//         createPassword: $("#create-password").val(),
//         repeatPassword: $("#repeat-password").val(),
//     }
//     if(newUser.createPassword === newUser.repeatPassword){
//         database.ref("users").update({
//             [newUser.userName]: {
//                 "firstName": newUser.firstName,
//                 "lastName": newUser.lastName,
//                 "email": newUser.email,
//                 "password": newUser.createPassword,
//             }
//         })
//         document.getElementById("form").reset();
//     }else{
//         $("#submit-name").text("Passwords do not match.");
//     }
// })

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
