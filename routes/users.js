const multer = require('multer');
//const upload = multer({dest: './uploads'});
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
var async = require('async');
// Load User model
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, role, nid } = req.body;
  let errors = [];

  // check for blank fields 
  if ( !role || !name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // check for password match or not
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      role,
      email,
      name,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          role,
          email,
          name,
          password,
          password2
        });
      } else {
        const newUser = new User({
          role,
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

 // Login

router.post('/login', (req, res, next) =>{
   // const {email, passport} = req.body;
   // const validate = User.findOne({email: email}, {role: "admin"}).then(user =>{
    //   if(validate){
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
   // }
   // });
});  
        

/*router.post('/login', (req, res, next) => {
         passport.authenticate('local', {
          if User.find({ email: email},
            {role: admin}).then( user =>{
          if( role = 'admin'){
         successRedirect: '/admin',
         failureRedirect: '/users/login',
         failureFlash: true
         })(req, res, next);
      });

      else if( role = 'field'){
        passport.authenticate('local', {
          successRedirect: '/field',
         failureRedirect: '/users/login',
         failureFlash: true
         })(req, res, next);
      }
  

  });
 
}); */




// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;