/*********************************************************************************
 *  * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. *
 *  * Group member Name: Chaitanya Pavuluri, Krupali Patel  Student IDs:N01452744 ,N01452616 Date: 12-04-2021 
* * ********************************************************************************/
var express = require('express');
var mongoose = require('mongoose');
//const cool = require('cool-ascii-faces');
var app = express();
var db = require('./function');
var bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
// pull information from HTML POST (express4)
const jwt=require('jsonwebtoken');
const verifytoken=require('./JwtAuthentication/Authentication');


const exphbs = require('express-handlebars');
app.use(express.urlencoded({ extended: true }));
const dotenv=require('dotenv').config();

app.engine('.hbs', exphbs.engine({ extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
var port = process.env.PORT || 8000;

const restaurant = require('./models/Restaurant');

//express().get('/cool', (req, res) => res.send(cool()));

db.initialize();

app.post('/login', (req,res)=>{
	console.log(req.body)
	//Authenticated User
	const username = req.body.username
	const user = { name : username }
	const accessToken = jwt.sign(user, process.env.SECRET)
	res.json({ accessToken : accessToken})
	})

//get all book data from db
app.get('/api/restaurants',verifytoken, async function (req, res) {

	const result = await db.getAllRestaurants();
	res.json(result);
});

// get a restaurant by restaurant_id
app.get('/api/restaurants/:restaurant_id',verifytoken, async function (req, res) {
	let id = req.params.restaurant_id;

	const result2 = await db.getRestaurantById(id);
	res.json(result2);
});

//add a new restaurant
app.post('/api/restaurants',verifytoken,  async function (req, res) {
	let data = req.body;
	console.log(req.body)
	let result3 = await db.addNewRestaurant(data);
	res.json(result3);
});

//delete a restaurant using restaurant_id
app.delete('/api/restaurants/:restaurant_id', verifytoken, async function (req, res) {

	let id = req.params.restaurant_id;
	const result5 = await db.deleteRestaurantById(id);
	res.json(result5);
});
//update a restaurant using restaurant_id
app.put('/api/restaurants/:restaurant_id',verifytoken,  async function (req, res) {
	let id = req.params.restaurant_id;
	let data = req.body;
	let result6 = await db.updateRestaurantById(data, id);
	res.json(result6);

});


app.get('/api/search', (req, res, next) => {
	res.render('insert', { layout: false });
});

app.post('/api/search', (req, res, next) => {
	const borough = req.body.borough;
	const page = req.body.page;
	const perPage = req.body.perPage;
	db.getAllRestaurants1(page, perPage, borough).then(function (data, err) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.render('getData', { data: data, layout: false });
	});
});

app.listen(port);
console.log("App listening on port : " + port);
