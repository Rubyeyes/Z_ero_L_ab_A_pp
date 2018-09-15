var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var MiniProgramBanner = mongoose.model('MiniProgramBanner');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
miniprogrambanner api
============================================================ */

/* Add a miniprogrambanner. */
router.post('/', adminAuth, function(req, res, next) {
	var miniprogrambanner = new MiniProgramBanner(req.body);

	miniprogrambanner.save(function(err, miniprogrambanner) {
		if(err){return next(err);}
		res.json(miniprogrambanner);
	});
});

/* GET miniprogrambanners page. */
router.get('/', function(req, res, next) {
	MiniProgramBanner
	.find()
	.exec(function(err, miniprogrambanners) {
		if(err){return next(err);}
		res.json(miniprogrambanners);
	})
});

/* Preload miniprogrambanner object */
router.param('miniprogrambanner', function(req, res, next, id){
	var query = MiniProgramBanner.findById(id);
	
	query.exec(function(err, miniprogrambanner){
		if(err) {return next(err);}
		if(!miniprogrambanner) {return next(new Error('Can\'t find miniprogrambanner'));}

		res.miniprogrambanner = miniprogrambanner;
		return next();
	});
});

/* Get one miniprogrambanner*/
router.get('/:miniprogrambanner', function(req, res){
	res.json(res.miniprogrambanner);
});

/* Update a miniprogrambanner */
router.put('/:miniprogrambanner/edit', adminAuth, function(req, res) {
	MiniProgramBanner.findOneAndUpdate({_id: res.miniprogrambanner._id}, req.body, {new:true})
	.exec(function(err, miniprogrambanner, next) {
		if (err) {return next(err);}
		console.log(miniprogrambanner);
		res.json(miniprogrambanner)
	});
});

/* Delete a miniprogrambanner */
router.delete('/:miniprogrambanner/delete', adminAuth, function(req, res) {
	MiniProgramBanner.findOne({_id: res.miniprogrambanner._id}, function(err, miniprogrambanner) {
		console.log(miniprogrambanner);
		if(err) {return next(err)};
		miniprogrambanner.remove();
		res.json({success: true, msg: 'Web Banner deleted.'});
	})
})


/* Searh miniprogrambanners */
router.get('/search', function(req, res, next) {
	MiniProgramBanner.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,miniprogrambanners) {
			if(err){return next(err);}
			res.json(miniprogrambanners);
	    })	   
});

module.exports = router;