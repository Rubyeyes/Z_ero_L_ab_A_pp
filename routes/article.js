var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Article = mongoose.model('Article');
var ArticleCategory = mongoose.model('ArticleCategory');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');


// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
article api
============================================================ */

/* Add a article. */
router.post('/', adminAuth, function(req, res, next) {
	var article = new Article(req.body);

	article.save(function(err, article) {
		if(err){return next(err);}
		ArticleCategory.findOne({_id: article.category[0]}, function(err, articleCategory) {
			if(err){return next(err)}
			if(articleCategory) {
				articleCategory.articles.push(article._id);
				articleCategory.save();
			}
		})
		res.json(article);
	});
});

/* GET articles page. */
router.get('/', adminAuth, function(req, res, next) {
	Article.find(function(err, articles) {
		if(err){return next(err);}
		res.json(articles);
	})
});

/* Preload article object */
router.param('article', function(req, res, next, id){
	var query = Article.findById(id);
	
	query.exec(function(err, article){
		if(err) {return next(err);}
		if(!article) {return next(new Error('Can\'t find article'));}

		res.article = article;
		return next();
	});
});

/* Get one article*/
router.get('/:article', function(req, res){
	res.article.populate('category', function(err, article) {
		if(err) {return next(err);}
		
		res.json(article);
	})
});

/* Update a article */
router.put('/:article/edit', adminAuth, function(req, res) {
	Article.findOneAndUpdate({_id: res.article._id}, req.body, {new:true}, function(err, article, next) {
		if (err) {return next(err);}
		res.json(article)
	});
});

/* Delete a article */
router.delete('/:article/delete', adminAuth, function(req, res) {
	Article.findOne({_id: res.article._id}, function(err, article) {
		console.log(article);
		if(err) {return next(err)};
		article.remove();
		res.json({success: true, msg: 'Article deleted.'});
	})
})


/* Searh articles */
router.get('/search', function(req, res, next) {
	Article.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,articles) {
			if(err){return next(err);}
			res.json(articles);
	    })	   
});

module.exports = router;