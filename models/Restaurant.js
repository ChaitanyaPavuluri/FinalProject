/*********************************************************************************
 *  * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. *
 *  * Group member Name: Chaitanya Pavuluri, Krupali Patel  Student IDs:N01452744 ,N01452616 Date: 12-04-2021 
* * ********************************************************************************/
const { ObjectId } = require('bson');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
RestaurantSchema = new Schema({
  id: ObjectId,
  coord: Number,
  street: String,
  zipcode: String,
  building: String,
  coord: String,
  borough: String,
  cuisine: String,

  date: Date,
  grade: String,
  score: Number,
  status: String,
  name: String,
  restaurant_id: String,
});
module.exports = mongoose.model('restaurants', RestaurantSchema);
console.log("Schema created succesfully");