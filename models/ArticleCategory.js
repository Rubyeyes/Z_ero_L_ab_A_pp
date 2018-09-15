var mongoose = require('mongoose');

//create a new schema
var ArticleCategorySchema = new mongoose.Schema({
	title: String,
	order: Number,
	articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
});

mongoose.model('ArticleCategory', ArticleCategorySchema);