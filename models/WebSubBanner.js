var mongoose = require('mongoose');

//create a new schema
var WebSubBannerSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	imgHref: String,
	order: Number,
});

mongoose.model('WebSubBanner', WebSubBannerSchema);