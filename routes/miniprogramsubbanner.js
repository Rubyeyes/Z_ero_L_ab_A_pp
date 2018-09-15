var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var MiniProgramSubBanner = mongoose.model('MiniProgramSubBanner');
var searchable = require('mongoose-searchable');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
miniprogramsubbanner api
============================================================ */

/* Add a miniprogramsubbanner. */
router.post('/', adminAuth, function(req, res, next) {
	var miniprogramsubbanner = new MiniProgramSubBanner(req.body);

	miniprogramsubbanner.save(function(err, miniprogramsubbanner) {
		if(err){return next(err);}
		res.json(miniprogramsubbanner);
	});
});

/* GET miniprogramsubbanners page. */
router.get('/', function(req, res, next) {
	MiniProgramSubBanner
	.find()
	.exec(function(err, miniprogramsubbanners) {
		if(err){return next(err);}
		res.json(miniprogramsubbanners);
	})
});

/* Preload miniprogramsubbanner object */
router.param('miniprogramsubbanner', function(req, res, next, id){
	var query = MiniProgramSubBanner.findById(id);
	
	query.exec(function(err, miniprogramsubbanner){
		if(err) {return next(err);}
		if(!miniprogramsubbanner) {return next(new Error('Can\'t find miniprogramsubbanner'));}

		res.miniprogramsubbanner = miniprogramsubbanner;
		return next();
	});
});

/* Get one miniprogramsubbanner*/
router.get('/:miniprogramsubbanner', function(req, res){
	res.json(res.miniprogramsubbanner);
});

/* Update a miniprogramsubbanner */
router.put('/:miniprogramsubbanner/edit', adminAuth, function(req, res) {
	MiniProgramSubBanner.findOneAndUpdate({_id: res.miniprogramsubbanner._id}, req.body, {new:true})
	.exec(function(err, miniprogramsubbanner, next) {
		if (err) {return next(err);}
		console.log(miniprogramsubbanner);
		res.json(miniprogramsubbanner)
	});
});

/* Delete a miniprogramsubbanner */
router.delete('/:miniprogramsubbanner/delete', adminAuth, function(req, res) {
	MiniProgramSubBanner.findOne({_id: res.miniprogramsubbanner._id}, function(err, miniprogramsubbanner) {
		console.log(miniprogramsubbanner);
		if(err) {return next(err)};
		miniprogramsubbanner.remove();
		res.json({success: true, msg: 'Web Banner deleted.'});
	})
})


/* Searh miniprogramsubbanners */
router.get('/search', function(req, res, next) {
	MiniProgramSubBanner.find({'$or':[
					{ "Shrt_Desc": { "$regex": req.query.key_word, "$options": "i" } },
					{ "Shrt_Desc_zh_CN": { "$regex": req.query.key_word, "$options": "i"} } 
					// {Shrt_Desc:new RegExp(req.query.key_word,'i')},
					// {Shrt_Desc_zh_CN:new RegExp(req.query.key_word,'i')}
		]}).exec(function(err,miniprogramsubbanners) {
			if(err){return next(err);}
			res.json(miniprogramsubbanners);
	    })	   
});

module.exports = router;