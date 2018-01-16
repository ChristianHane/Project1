var database = firebase.database();

$("#register-button").on("click", function(){
    var newUser = {
        userName: $("#username").val(),
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        email: $("#email").val(),
        createPassword: $("#create-password").val(),
        repeatPassword: $("#repeat-password").val(),
    }
    if(newUser.createPassword === newUser.repeatPassword){
        database.ref("users").update({
            [newUser.userName]: {
                "firstName": newUser.firstName,
                "lastName": newUser.lastName,
                "email": newUser.email,
                "password": newUser.createPassword,
            }
        })
        document.getElementById("form").reset();
    }else{
        $("#submit-name").text("Passwords do not match.");
    }
})