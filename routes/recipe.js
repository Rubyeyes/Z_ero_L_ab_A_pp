var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Recipe = mongoose.model('Recipe');
var RecipeCategory = mongoose.model('RecipeCategory');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');


// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
recipe api
============================================================ */

/* Add a recipe. */
router.post('/', adminAuth, function(req, res, next) {
	var recipe = new Recipe(req.body);

	recipe.save(function(err, recipe) {
		if(err){return next(err);}
		RecipeCategory.findOne({_id: recipe.category[0]}, function(err, recipeCategory) {
			if(err){return next(err)}
			if(recipeCategory) {
				recipeCategory.recipes.push(recipe._id);
				recipeCategory.save();
			}
		})
		res.json(recipe);
	});
});

/* GET recipes page. */
router.get('/', adminAuth, function(req, res, next) {
	Recipe.find(function(err, recipes) {
		if(err){return next(err);}
		res.json(recipes);
	})
});

/* Preload recipe object */
router.param('recipe', function(req, res, next, id){
	var query = Recipe.findById(id);
	
	query.exec(function(err, recipe){
		if(err) {return next(err);}
		if(!recipe) {return next(new Error('Can\'t find recipe'));}

		res.recipe = recipe;
		return next();
	});
});

/* Get one recipe*/
router.get('/:recipe', function(req, res){
	res.recipe.populate('category', function(err, recipe) {
		if(err) {return next(err);}
		
		res.json(recipe);
	})
});

/* Update a recipe */
router.put('/:recipe/edit', adminAuth, function(req, res) {
	Recipe.findOneAndUpdate({_id: res.recipe._id}, req.body, {new:true}, function(err, recipe, next) {
		if (err) {return next(err);}
		res.json(recipe)
	});
});

/* Delete a recipe */
router.delete('/:recipe/delete', adminAuth, function(req, res) {
	Recipe.findOne({_id: res.recipe._id}, function(err, recipe) {
		console.log(recipe);
		if(err) {return next(err)};
		recipe.remove();
		res.json({success: true, msg: 'Recipe deleted.'});
	})
})


/* Searh recipes */
router.get('/search', function(req, res, next) {
	Recipe.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,recipes) {
			if(err){return next(err);}
			res.json(recipes);
	    })	   
});

module.exports = router;