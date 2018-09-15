var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var WebSubBanner = mongoose.model('WebSubBanner');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
websubbanner api
============================================================ */

/* Add a websubbanner. */
router.post('/', adminAuth, function(req, res, next) {
	var websubbanner = new WebSubBanner(req.body);

	websubbanner.save(function(err, websubbanner) {
		if(err){return next(err);}
		res.json(websubbanner);
	});
});

/* GET websubbanners page. */
router.get('/', function(req, res, next) {
	WebSubBanner
	.find()
	.exec(function(err, websubbanners) {
		if(err){return next(err);}
		res.json(websubbanners);
	})
});

/* Preload websubbanner object */
router.param('websubbanner', function(req, res, next, id){
	var query = WebSubBanner.findById(id);
	
	query.exec(function(err, websubbanner){
		if(err) {return next(err);}
		if(!websubbanner) {return next(new Error('Can\'t find websubbanner'));}

		res.websubbanner = websubbanner;
		return next();
	});
});

/* Get one websubbanner*/
router.get('/:websubbanner', function(req, res){
	res.json(res.websubbanner);
});

/* Update a websubbanner */
router.put('/:websubbanner/edit', adminAuth, function(req, res) {
	WebSubBanner.findOneAndUpdate({_id: res.websubbanner._id}, req.body, {new:true})
	.exec(function(err, websubbanner, next) {
		if (err) {return next(err);}
		console.log(websubbanner);
		res.json(websubbanner)
	});
});

/* Delete a websubbanner */
router.delete('/:websubbanner/delete', adminAuth, function(req, res) {
	WebSubBanner.findOne({_id: res.websubbanner._id}, function(err, websubbanner) {
		console.log(websubbanner);
		if(err) {return next(err)};
		websubbanner.remove();
		res.json({success: true, msg: 'Web Banner deleted.'});
	})
})


/* Searh websubbanners */
router.get('/search', function(req, res, next) {
	WebSubBanner.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,websubbanners) {
			if(err){return next(err);}
			res.json(websubbanners);
	    })	   
});

module.exports = router;