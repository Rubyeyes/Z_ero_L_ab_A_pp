var mongoose = require('mongoose');

//create a new schema
var RecipeSchema = new mongoose.Schema({
	title: String,
	subtitle: String,
	thumbnailUrl: String,
	recipeUrl: String,
	order: Number,	
	category: [{type: mongoose.Schema.Types.ObjectId, ref: 'RecipeCategory'}],
});

mongoose.model('Recipe', RecipeSchema);