var mongoose = require('mongoose');

//create a new schema
var WebBannerSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	imgHref: String,
	order: Number,
});

mongoose.model('WebBanner', WebBannerSchema);