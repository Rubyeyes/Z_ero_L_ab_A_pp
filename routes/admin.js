var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
// var Post = mongoose.model('Post');
// var Comment = mongoose.model('Comment');
var Admin = mongoose.model('Admin');
var jwt = require('express-jwt');

// INstantiating the express-jwt middleware
var adminAuth = jwt({secret: 'Ewqscxz0987', userProperty: 'payload'});

/* ========================================================== 
Admin API
============================================================ */
/* Preload admin object */
router.param('admin', adminAuth, function(req, res, next, id) {
	Admin.findById(id)
		.exec(function(err, admin) {
		if(err) {return next(err);}
		if(!admin) {return next(new Error('Can\'t find admin'));}

		res.admin = admin;
		return next();
	});
});

/* Preload admin by email */
router.param('admin_by_email', adminAuth, function(req, res, next, email) {
	Admin.findOne({'email': email}, function(err, admin_by_email) {
		if(err) {return next(err);}
		if(!admin_by_email) {return next(new Error('Can\'t find admin'));}

		res.admin_by_email = admin_by_email;
		return next();
	});
});

/* Admin register */
router.post('/register', function(req, res, next) {
	if(!req.body.adminname || !req.body.password || !req.body.email) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var admin = new Admin();

	admin.adminname = req.body.adminname;
	admin.setPassword(req.body.password);
	admin.email = req.body.email;
	admin.phone_number = req.body.phone_number;

	admin.save(function(err) {
		if(err){return next(err);}

		return res.json({token: admin.generateJWT()})
	});
});

/* Admin login */
router.post('/login', function(req, res, next) {	
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }; 

  passport.authenticate('adminPassport', function(err, admin, info){
    if(err){ return next(err); }

    if(admin){
      return res.json({token: admin.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/* Get admin info*/
router.get('/:admin', adminAuth, function(req, res, next) {
	res.json(res.admin);
});

router.get('/adminsnameemail', function(req, res) {
	Admin.find({}, function(err, admins) {
		var adminsNameEmail = [];
		var i = 0;

		admins.forEach(function(admin) { 
			adminsNameEmail[i] = {
				"adminname": admin.adminname,
				"email": admin.email
			}
			i += 1;
		});

		res.json(adminsNameEmail);
	});
});


/* Get admin info by email */
router.post('/forget', adminAuth, function(req, res, next) {
	Admin.findOne({'email': req.body.email}, function(err, admin) {
		if(err) {return next(err);}
		if(!admin) {
			res.json({message: "Cannot find admin"})
			return next();
		}

		var token = admin.generateForgetPasswordToken();


        admin.resetPasswordToken = token;
        admin.resetPasswordExpire = Date.now() + 3600000; // 1 hour

        admin.save(function(err, admin) {
        	if (err) { return next(err)}
        });
	});
});



module.exports = router;
