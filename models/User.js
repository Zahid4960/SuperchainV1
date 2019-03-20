/* Database model named user.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* User schema */
const UserSchema = mongoose.Schema({
    /* For user's username */
	username: {
		type: String,
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
	},
	/* For current date */
	 date: {
    type: Date,
    default: Date.now
  }
});

/* For creating new user and save their information into mongodb database(SuperchainV1).
We will get all the information from registration form*/
const User = mongoose.model('User', UserSchema);
module.exports = User;