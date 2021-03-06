const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const async = require('async');
const qr = require('qr-image'); // for generating qr code.
const sha256 = require('sha256') // for generating hash for block chain
const path = require('path'); // package for path 
const multer = require('multer'); // package for image upload

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));
// Routes for field data edit, delete
app.use('/field', require('./routes/field.js'));
// Routes for producton data edit, delete
app.use('/production', require('./routes/production.js'));
// Routes for quality control data edit, delete
app.use('/quality', require('./routes/quality.js'));
// Routes for transport data edit, delete
app.use('/transport', require('./routes/transport.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
