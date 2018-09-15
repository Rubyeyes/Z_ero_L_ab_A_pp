var mongoose = require('mongoose');

//create a new schema
var MiniProgramSubBannerSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	imgHref: String,
	order: Number,
});

mongoose.model('MiniProgramSubBanner', MiniProgramSubBannerSchema);