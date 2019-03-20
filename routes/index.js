
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Index page will redirected to home,navbar barnd(superchain) 
router.get('/', (req, res) => res.render('index'));

// about page
router.get('/about', (req, res) => res.render('about'));

// contact page
router.get('/contact', (req, res) => res.render('contact'));

// contact page
router.get('/welcome', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;