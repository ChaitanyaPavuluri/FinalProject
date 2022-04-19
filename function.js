/*********************************************************************************
 *  * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. *
 *  * Group member Name: Chaitanya Pavuluri, Krupali Patel  Student IDs:N01452744 ,N01452616 Date: 18-04-2021 
* * ********************************************************************************/


var mongoose = require('mongoose');
var Restaurant = require('./models/Restaurant');
const dotenv=require('dotenv').config();

async function initialize() {
     mongoose.connect(process.env.url, function (err) {
          if (err) throw err;
          console.log('Connected to database');
     });
}

async function getAllRestaurants() {
     return await Restaurant.find()
}

async function getRestaurantById(Id) {
     return await Restaurant.findById(Id);
}

async function addNewRestaurant(data) {
     Restaurant.create({
          id: data.Id,
          coord: data.coord,
          street: data.street,
          zipcode: data.zipcode,
          building: data.building,
          coord: data.coord,
          borough: data.borough,
          cuisine: data.cuisine,
          date: data.date,
          grade: data.grade,
          score: data.score,
          status: data.status,
          name: data.name,
          restaurant_id: data.restaurant_id,

     })
     console.log("Data", data);
     return await Restaurant.find();

}

async function deleteRestaurantById(id) {
     return Restaurant.findByIdAndDelete({ _id: id });
}

async function updateRestaurantById(data, id) {
     var updatedata = {
          coord: data.coord,
          street: data.street,
          zipcode: data.zipcode,
          building: data.building,
          coord: data.coord,
          borough: data.borough,
          cuisine: data.cuisine,
          date: data.date,
          grade: data.grade,
          score: data.score,
          status: data.status,
          name: data.name,
          restaurant_id: data.restaurant_id,
     }

     return await Restaurant.findByIdAndUpdate({ _id: id }, updatedata);

}
async function getAllRestaurants1(page, perPage, borough) {
     let findBy = borough ? { borough } : {};

     return Restaurant.find(findBy).sort({ restaurant_id: +1 }).skip(page * +perPage).limit(+perPage).exec();

}
module.exports = { getAllRestaurants, getRestaurantById, addNewRestaurant, deleteRestaurantById, updateRestaurantById, initialize, getAllRestaurants1 };