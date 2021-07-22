
var firebase = require("firebase/app");


require("firebase/database");

var firebaseConfig = {
    // hidden firebase config 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = { firebase, firebaseConfig }
