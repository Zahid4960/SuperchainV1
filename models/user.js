/* Database model named user.js */
/* For connection with mongodb */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

/* User schema */
var userSchema = mongoose.Schema({
    /* For user's username */
	username: {
		type: String,
		index: true
	},
	/* For user's name */
	name: {
		type: String
	},
	/* For user's email */
	email:{
		type: String
	},
	/* For user's role */
	role: {
		type: String
	},
	/* For user's password */
	password: {
		type: String
	},
	/* For user's identity card picture */
	id_pic: {
		type: String
	}
});

/* For creating new user and save their information into mongodb database(SuperchainV1).
We will get all the information from registration form*/
var user = module.exports = mongoose.model('user', userSchema);
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
    	newUser.password = hash; // converts plain password into hashed encrypted password
    	newUser.save(callback);
     });
 });	
}