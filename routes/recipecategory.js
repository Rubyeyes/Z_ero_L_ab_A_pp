var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var RecipeCategory = mongoose.model('RecipeCategory');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
recipecategory api
============================================================ */

/* Add a recipecategory. */
router.post('/', adminAuth, function(req, res, next) {
	var recipecategory = new RecipeCategory(req.body);

	recipecategory.save(function(err, recipecategory) {
		if(err){return next(err);}
		res.json(recipecategory);
	});
});

/* GET recipecategories page. */
router.get('/', function(req, res, next) {
	RecipeCategory
	.find()
	.populate('recipes')
	.exec(function(err, recipecategories) {
		if(err){return next(err);}
		res.json(recipecategories);
	})
});

/* Preload recipecategory object */
router.param('recipecategory', function(req, res, next, id){
	var query = RecipeCategory.findById(id);
	
	query.exec(function(err, recipecategory){
		if(err) {return next(err);}
		if(!recipecategory) {return next(new Error('Can\'t find recipecategory'));}

		res.recipecategory = recipecategory;
		return next();
	});
});

/* Get one recipecategory*/
router.get('/:recipecategory', function(req, res){
	res.recipecategory.populate('recipes', function(err, recipecategory) {
		if(err) {return next(err);}
		
		res.json(recipecategory);
	})
});

/* Update a recipecategory */
router.put('/:recipecategory/edit', adminAuth, function(req, res) {
	RecipeCategory.findOneAndUpdate({_id: res.recipecategory._id}, req.body, {new:true})
	.populate('recipes')
	.exec(function(err, recipecategory, next) {
		if (err) {return next(err);}
		console.log(recipecategory);
		res.json(recipecategory)
	});
});

/* Delete a recipecategory */
router.delete('/:recipecategory/delete', adminAuth, function(req, res) {
	RecipeCategory.findOne({_id: res.recipecategory._id}, function(err, recipecategory) {
		console.log(recipecategory);
		if(err) {return next(err)};
		recipecategory.remove();
		res.json({success: true, msg: 'Recipe Category deleted.'});
	})
})


/* Searh recipecategories */
router.get('/search', function(req, res, next) {
	RecipeCategory.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,recipecategories) {
			if(err){return next(err);}
			res.json(recipecategories);
	    })	   
});

module.exports = router;