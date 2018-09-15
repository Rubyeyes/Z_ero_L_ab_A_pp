var mongoose = require('mongoose');

//create a new schema
var RecipeCategorySchema = new mongoose.Schema({
	title: String,
	order: Number,
	recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
});

mongoose.model('RecipeCategory', RecipeCategorySchema);