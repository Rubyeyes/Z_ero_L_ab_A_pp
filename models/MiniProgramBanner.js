var mongoose = require('mongoose');

//create a new schema
var MiniProgramBannerSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	imgHref: String,
	order: Number,
});

mongoose.model('MiniProgramBanner', MiniProgramBannerSchema);