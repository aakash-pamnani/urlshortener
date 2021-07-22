
var firebase = require("firebase/app");


require("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyDq1iNH_Pa19bDgqtXd8AxbWlyuYVbDGY4",
    authDomain: "url-shortner-a8c1b.firebaseapp.com",
    databaseURL: "https://url-shortner-a8c1b-default-rtdb.firebaseio.com",
    projectId: "url-shortner-a8c1b",
    storageBucket: "url-shortner-a8c1b.appspot.com",
    messagingSenderId: "40355104824",
    appId: "1:40355104824:web:9e0347f9ca608fcc9ebecd",
    measurementId: "G-55RNM4YF22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = { firebase, firebaseConfig }