const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var async = require('async', true);

const Field = require('../models/Field');

// Index page will redirected to home,navbar barnd(superchain) 
router.get('/', (req, res) => res.render('index'));

// about page for get method
router.get('/about', (req, res) => res.render('about'));

// contact page for get method
router.get('/contact', (req, res) => res.render('contact'));

// issues page for get method
router.get('/issues', ensureAuthenticated,(req, res) => 
  res.render('issues', {
    user: req.user
    })
  );

// messages page for get method
router.get('/messages', ensureAuthenticated,(req, res) => 
  res.render('messages', {
    user: req.user
    })
  );

// inquiry page for get method
router.get('/search', (req,res) => res.render('search'));

// dashboard page for get method
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
    field: req.field
  })
);

// admin page for get method
router.get('/admin', ensureAuthenticated, (req, res) =>
  res.render('admin', {
    user: req.user
  })
);

// field page for get method
router.get('/field', ensureAuthenticated, (req, res) =>
  res.render('field', {
    user: req.user
    field: req.field
  })
);


// field page for post method
router.post('/field', (req, res) =>{
  const  { productID, productName, fieldLocation, farmerName, farmerMobile, farmerNid } = req.body;
  let errors = [];

  //checks for blank field
  if( !productID || !productName || !fieldLocation || !farmerName || !farmerMobile || !farmerNid ){
    errors.push({ msg: 'Please enter all fields' });
  }
  // check for farmer mobile number length if it less than 12 digits then don't accept
    if (farmerMobile.length < 11) {
      errors.push({ msg: 'Mobile number must be at least 11 digits' });
    }
   // check for farmer nid number length if it less than 17 digits then don't accept
    if (farmerNid.length < 17) {
      errors.push({ msg: 'Nid number must be at least 17 digits' });
    }
    // if finds any errors then show it
    if(errors.length > 0){
      res.render('field',{
        errors,
        productID,
        productName,
        fieldLocation,
        farmerName,
        farmerMobile,
        farmerNid
      });
    }
  // if it passes all the validation then it will store that data into field collections
    else{
      const newField = new Field({
        productID,
        productName,
        fieldLocation,
        farmerName,
        farmerMobile,
        farmerNid
      });
      newField.save().then( field =>{
         req.flash('success_msg',
        'Field data uploaded successfully');
         res.redirect('/dashboard');
      });
    }
});

// production page for get method
router.get('/production', ensureAuthenticated, (req, res) =>
  res.render('production', {
    user: req.user
  })
);

// quality page for get method
router.get('/quality', ensureAuthenticated, (req, res) =>
  res.render('quality', {
    user: req.user
  })
);

// transport page for get method
router.get('/transport', ensureAuthenticated, (req, res) =>
  res.render('transport', {
    user: req.user
  })
);

module.exports = router;