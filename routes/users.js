const multer = require('multer');
const upload = multer({dest: './uploads'});
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', upload.single('nid'),(req, res) => {
  const { username, name, email, password, password2, role, nid } = req.body;
  let errors = [];

  if (!username || !role || !nid || !name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

   /* Check identity picture uploaded or not */
  if(req.file){
    console.log("Uploaded Identity Picture!!!");
    var id_pic = req.file.filename;
  }
  else{
    console.log("Identity Picture is not Uploaded !!! ");
    var id_pic = "noImage.jpg";
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      role,
      username,
      email,
      name,
      password,
      password2,
      nid
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          role,
          username,
          email,
          name,
          password,
          password2
        });
      } else {
        const newUser = new User({
          role,
          username,
          name,
          email,
          password,
          nid
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
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;