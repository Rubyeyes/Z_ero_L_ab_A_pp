var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var mongoose = require('mongoose');
var Food = mongoose.model('Food');

var foodUrl = [];
var foodName = [];

for(var i = 1; i < 11; i++) {
	setTimeout(function() {
		for (var j = 1; j < 6; j++) {

			setTimeout(function() {
				var pageToVisit = "http://www.boohee.com/food/group/" + i + "?page=" + j;
				request(pageToVisit, function(error, response, body) {
					if(error) {
						console.log("Error: " + error);
					}
				   // Check status code (200 is HTTP OK)
				   console.log("Status code: " + response.statusCode);
				   if(response.statusCode === 200) {

						// Parse the document body
						var $ = cheerio.load(body);
						$('ul li div h4 a').each(function() {
							// save food name
							foodName.push($(this).text());
							foodUrl.push("http://www.boohee.com/" + $(this).attr('href'));
						});

					};  
				});
			}, 1000);

		}
	}, 1000)	
}

for (var k=0; k<foodName.length; k++) {
	request(foodUrl[k], function(error, response, body) {
		if(error) {
				console.log("Page Shiwu Error: " + error);
		};

		if(response.statusCode === 200) {
			var shiwu = cheerio.load(body);
			var food = new Food();
			food.name = foodName[k];
			food.nutrition = shiwu('div.nutr-tag dl').text();
			food.save(function(err, fleet) {
				if(err){return next(err);}
			});
		};
	});
}


Food.find({}).exec(function(err, foods) {
			if(err){return next(err);}
			console.log(foods.length);}
		);

