var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var multer = require('multer');

//middleware to authenticate jwt tokens
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* ========================================================== 
Upload API
============================================================ */

//multers disk storage settings
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './client/assets/image/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API path that will upload the files */
router.post('/', function(req, res) {
	console.log(req);
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    })    
});


module.exports = router;
