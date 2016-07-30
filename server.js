//Server side program to take relevant information from a website for users to comment on
//================================================================================================//

//Requiring the necessary program files to run the server
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var request = require("request");

var databaseURL = "";
var collections = [""];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

var app = express();

//Loads the web page into the request package to grab information for the user to view
request("http://www.theonion.com", function(err, res, html) {

	//Allows the use of $ similar to jQuery
	var $ = cheerio.load(html);

	//Result will hold an array of data objects containing all the news articles information
	var result = [];

	//Finds each called element within the document and saves the pertinent ones for our page
	$("article").each(function(i, element) {
		//Finds the titles of each article
		var title = $(this).find("h2").children().text().trim();

		//Finds the description of each article, if available
		var desc = $(this).find("div.desc").text().trim();

		//Finds the image of each article, if available
		var image = $(this).find("img").attr("src");

		//Moves captured info to result array as an object
		result.push({
			title: title,
			desc: desc,
			image: image,
		});
	});

	//Tests data capture
	console.log(result);
});