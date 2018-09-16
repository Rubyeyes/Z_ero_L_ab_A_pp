var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var ArticleCategory = mongoose.model('ArticleCategory');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
articlecategory api
============================================================ */

/* Add a articlecategory. */
router.post('/', adminAuth, function(req, res, next) {
	var articlecategory = new ArticleCategory(req.body);

	articlecategory.save(function(err, articlecategory) {
		if(err){return next(err);}
		res.json(articlecategory);
	});
});

/* GET articlecategories page. */
router.get('/', function(req, res, next) {
	ArticleCategory
	.find()
	.populate('articles')
	.exec(function(err, articlecategories) {
		if(err){return next(err);}
		res.json(articlecategories);
	})
});

/* Preload articlecategory object */
router.param('articlecategory', function(req, res, next, id){
	var query = ArticleCategory.findById(id);
	
	query.exec(function(err, articlecategory){
		if(err) {return next(err);}
		if(!articlecategory) {return next(new Error('Can\'t find articlecategory'));}

		res.articlecategory = articlecategory;
		return next();
	});
});

/* Get one articlecategory*/
router.get('/:articlecategory', function(req, res){
	res.articlecategory.populate('articles', function(err, articlecategory) {
		if(err) {return next(err);}
		
		res.json(articlecategory);
	})
});

/* Update a articlecategory */
router.put('/:articlecategory/edit', adminAuth, function(req, res) {
	ArticleCategory.findOneAndUpdate({_id: res.articlecategory._id}, req.body, {new:true})
	.populate('articles')
	.exec(function(err, articlecategory, next) {
		if (err) {return next(err);}
		res.json(articlecategory)
	});
});

/* Delete a articlecategory */
router.delete('/:articlecategory/delete', adminAuth, function(req, res) {
	ArticleCategory.findOne({_id: res.articlecategory._id}, function(err, articlecategory) {
		if(err) {return next(err)};
		articlecategory.remove();
		res.json({success: true, msg: 'Article Category deleted.'});
	})
})


/* Searh articlecategories */
router.get('/search', function(req, res, next) {
	ArticleCategory.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,articlecategories) {
			if(err){return next(err);}
			res.json(articlecategories);
	    })	   
});

module.exports = router;