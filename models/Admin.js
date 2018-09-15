var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//create a new schema
AdminSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	role: String,
	hash: String,
	salt: String,
	resetPasswordToken: String,
	resetPasswordExpire: String
});

//setup method
AdminSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

AdminSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return	this.hash === hash;
};

AdminSchema.methods.generateJWT = function() {
	//set expiration to 1 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 1);

	var JWT = jwt.sign(
		{
			_id: this._id,
			email: this.email,
			role: this.role,
			exp: parseInt(exp.getTime() / 1000),
		}, 
		'Ewqscxz0987'
	);

	console.log(JWT)

	return JWT
};

AdminSchema.methods.generateForgetPasswordToken = function() {
	this.token = crypto.randomBytes(16).toString('hex');
	return this.token;
};

mongoose.model('Admin', AdminSchema);
