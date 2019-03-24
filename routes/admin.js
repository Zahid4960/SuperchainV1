const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// send page for get method
router.get('/send', ensureAuthenticated,(req, res) => 
  res.render('send', {
    user: req.user
    })
  );

// receive page for get method
router.get('/receive', ensureAuthenticated,(req, res) => 
  res.render('receive', {
    user: req.user
    })
  );


module.exports = router;