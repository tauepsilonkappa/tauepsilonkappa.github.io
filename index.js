// index.js
// Defines all requests and routes

// Setup
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GET request for index page (with json objects)
app.get('/', function (req, res) {
	var resume = JSON.parse(fs.readFileSync('views/json/resume.json'));
	var data = { resume };
	res.render('pages/index', data);
});

// GET request for logo
app.get('/logo', function (req, res) {
	res.sendFile(path.join(__dirname, 'public/images/tekPics/takNasa'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));