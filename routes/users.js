var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

/* Connect user schema to users routes */
var user = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Routes for register for get method */
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

/* Routes for register for post method */
router.post('/register', upload.single('id_pic'), function(req, res, next) {
  var role = req.body.role;
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;


  /* Check identity picture uploaded or not */
  if(req.file){
  	console.log("Uploaded Identity Picture!!!");
  	var id_pic = req.file.filename;
  }
  else{
  	console.log("Identity Picture is not Uploaded !!! ");
  	var id_pic = "noImage.jpg";
  }

  /* Form validation for registration form */
  req.checkBody('role', 'Role field is required').notEmpty();
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('confirm_password', 'Password do not match').equals(req.body.password);
  //req.checkfile('id_pic', 'Identity Picture field is required').notEmpty();

  /* Check for errors at the time of submitting registration form */
  var errors = req.validationErrors();
  
  /* If gets error then show that errors to registartion page */
  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  }
  /* If there is no error then create a new user and save that info's into user database*/
  	else{
  		var newUser = new user({
        role: role,
        name: name,
        email: email,
        username: username,
        password: password,
        id_pic: id_pic
      });

      user.createUser(newUser, function(err, user){
        if(err) throw err
          console.log(user);
      });

      req.flash('success', 'You are successfully registered and now can login !!!');
      res.locals.message = req.flash();
      res.location('/');
      res.redirect('/'); 
  }
});

/* Routes for login for get method */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

/* Routes for dashboard for get method */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title: 'Dashboard'});
});

/* Routes for contact for get method */
router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Contact'});
});

/* Routes for about for get method */
router.get('/about', function(req, res, next) {
  res.render('about', {title: 'About'});
});

module.exports = router;