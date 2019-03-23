const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Index page will redirected to home,navbar barnd(superchain) 
router.get('/', (req, res) => res.render('index'));

// about page
router.get('/about', (req, res) => res.render('about'));

// contact page
router.get('/contact', (req, res) => res.render('contact'));

// issues page
router.get('/issues', ensureAuthenticated,(req, res) => 
  res.render('issues', {
    user: req.user
    })
  );

// inquiry page
router.get('/search', (req,res) => res.render('search'));

// dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// admin page
router.get('/admin', ensureAuthenticated, (req, res) =>
  res.render('admin', {
    user: req.user
  })
);

// admin page
router.get('/field', ensureAuthenticated, (req, res) =>
  res.render('field', {
    user: req.user
  })
);

// production page
router.get('/production', ensureAuthenticated, (req, res) =>
  res.render('production', {
    user: req.user
  })
);

// quality page
router.get('/quality', ensureAuthenticated, (req, res) =>
  res.render('quality', {
    user: req.user
  })
);

// transport page
router.get('/transport', ensureAuthenticated, (req, res) =>
  res.render('transport', {
    user: req.user
  })
);

module.exports = router;