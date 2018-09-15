var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var WebBanner = mongoose.model('WebBanner');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
webbanner api
============================================================ */

/* Add a webbanner. */
router.post('/', adminAuth, function(req, res, next) {
	var webbanner = new WebBanner(req.body);

	webbanner.save(function(err, webbanner) {
		if(err){return next(err);}
		res.json(webbanner);
	});
});

/* GET webbanners page. */
router.get('/', function(req, res, next) {
	WebBanner
	.find()
	.exec(function(err, webbanners) {
		if(err){return next(err);}
		res.json(webbanners);
	})
});

/* Preload webbanner object */
router.param('webbanner', function(req, res, next, id){
	var query = WebBanner.findById(id);
	
	query.exec(function(err, webbanner){
		if(err) {return next(err);}
		if(!webbanner) {return next(new Error('Can\'t find webbanner'));}

		res.webbanner = webbanner;
		return next();
	});
});

/* Get one webbanner*/
router.get('/:webbanner', function(req, res){
	res.json(res.webbanner);
});

/* Update a webbanner */
router.put('/:webbanner/edit', adminAuth, function(req, res) {
	WebBanner.findOneAndUpdate({_id: res.webbanner._id}, req.body, {new:true})
	.exec(function(err, webbanner, next) {
		if (err) {return next(err);}
		console.log(webbanner);
		res.json(webbanner)
	});
});

/* Delete a webbanner */
router.delete('/:webbanner/delete', adminAuth, function(req, res) {
	WebBanner.findOne({_id: res.webbanner._id}, function(err, webbanner) {
		console.log(webbanner);
		if(err) {return next(err)};
		webbanner.remove();
		res.json({success: true, msg: 'Web Banner deleted.'});
	})
})


/* Searh webbanners */
router.get('/search', function(req, res, next) {
	WebBanner.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,webbanners) {
			if(err){return next(err);}
			res.json(webbanners);
	    })	   
});

module.exports = router;