const express = require('express')
var app = express()
const path = require("path");
// const bodyParser = require("body-parser");

const { firebase, firebaseConfig } = require("./firebase");
// const { urlencoded } = require('body-parser');
const database = firebase.database();


// app.use(express.static("url shortner"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'views')));
console.log(__dirname);


app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    res.render('index')

})


app.listen(5003, (err) => {
    console.log("APPLICATION IS RUNNIG");
    // writeUserData();
})




app.post('/process', (req, res) => {

    const urlRegEx = "http|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
    var regEx = new RegExp(urlRegEx);
    const longurl = req.body.longurl;
    if (!longurl.match(regEx)) {
        res.status(400).json({ message: "please enter valid url" });
        return;
    }
    if (longurl.toString.length)
        console.log("32" + longurl);
    let shorturl;
    console.log("34" + req.body.customurl);
    if (req.body.customurl != "") {
        shorturl = req.body.customurl;
        checkShort(req, res, shorturl, longurl);
    }
    else {
        shorturl = (new Date()).getTime().toString(36);
        checkShort(req, res, shorturl, longurl);
    }





})

app.get('/404', (req, res) => {

    res.render('404')


});

app.get('/favicon.ico', (req, res) => {

    res.status(404).send("");


});

app.get('/:shorturl', (req, res) => {

    const url = req.params.shorturl;
    console.log("74" + "url:" + url);



    database.ref().child("urls").child(url).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log("78" + snapshot.val());
            res.redirect(snapshot.val());
        } else {
            console.log("Wrong Url");
            res.redirect('404');
        }
    }).catch((error) => {
        console.error(error);
    });


});


function addDatabaseEntry(shorturl, longurl) {


    database.ref("urls/" + shorturl).set(longurl);
}

function checkShort(req, res, shortUrl, longUrl) {


    database.ref().child("urls").child(shortUrl).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.status(400).json({ message: "Url Already Exists" });

        } else {
            console.log("No data available");
            addDatabaseEntry(shortUrl, longUrl);
            res.status(200).json({ shorturl: shortUrl, longurl: longUrl });
            res.end;
        }
    }).catch((error) => {
        console.error(error);
    });

}

