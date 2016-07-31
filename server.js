//Server side program to take relevant information from a website for users to comment on
//================================================================================================//

//Requiring the necessary program files to run the server
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var request = require("request");

//Allows use of express module
var app = express();

//Sets public file to be available for public view
app.use(express.static('public/assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Sets up calls for mongojs
var databaseURL = "ScraperDB";
var collections = ["articles", "comments"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseURL, collections);


app.get('/', function(req, res) {
	//Loads the web page into the request package to grab information for the user to view
	request("http://www.theonion.com", function(err, res, html) {

		//Allows the use of $ similar to jQuery
		var $ = cheerio.load(html);

		//Result will hold an array of data objects containing all the news articles information
		var result = [];

		//Finds each called element within the document and saves the pertinent ones for our page
		$("article").each(function(i, element) {
			//Grabs the titles of each article
			var title = $(this).find("h2").children().text().trim();

			//Grabs the description of each article, if available
			var desc = $(this).find("div.desc").text().trim();

			//Grabs the image of each article, if available
			var image = $(this).find("img").attr("src");

			//Grabs the link to the article
			var link = "http://www.theonion.com" + $(this).children().attr("href");

			//Moves captured info to result array as an object
			result.push({
				title: title,
				desc: desc,
				image: image,
				link: link,
			});
		});

		//Tests data capture
		//console.log(result);
		//res.send(result);
	res.render("index", result);
	});
});

// listen on port 8080
app.listen(8080, function() {
  console.log('App running on port 8080!');
});