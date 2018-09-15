var mongoose = require('mongoose');

//create a new schema
var ArticleSchema = new mongoose.Schema({
	title: String,
	subtitle: String,
	thumbnailUrl: String,
	articleUrl: String,
	order: Number,
	category: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArticleCategory'}],
});

mongoose.model('Article', ArticleSchema);