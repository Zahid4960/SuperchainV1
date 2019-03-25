const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Field = require('../models/Field');
const Production = require('../models/Production');
const Quality = require('../models/Quality');
const Transport = require('../models/Transport');

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

// result page for get method
router.get('/result', (req,res) => res.render('result'));

// result page for post method
router.post('/result', (req,res) => res.render('result'));

// search page for get method
router.get('/search', (req,res) => res.render('search'));

// search page for post method
router.post('/search', (req, res) => {
  const { search } = req.body;
  // if search box is blank then it will redirected to search page
  if(!search){
    res.render('search');
  }
  // query for enter productID from field, production, quality and transport collections
  let field = Field.findOne({ productID: search}).then( field => {
    let production = Production.findOne({ productID: search}).then( production =>{
      let quality = Quality.findOne({ productID: search }).then( quality => {
        let transport = Transport.findOne({ productID: search }).then( transport => {
          // if enter product id not found then redirected to search page
          if( !field || !production || !quality || !transport){
            res.render('search');
          }
          // if all goes well means find product id from all the table then render that on result page
          else{
            res.render('result', {
               "field": field,
               "production": production,
               "quality": quality,
               "transport": transport
            })
          }
        })
      })
    })
  });
});

// dashboard page for get method  
 router.get('/dashboard', ensureAuthenticated, (req, res) => {
   let field = Field.find({})
   .sort({date:'desc'}).exec( (err, field) => {
      let production = Production.find({})
      .sort({date: 'desc'}).exec((err, production) => {
          let quality = Quality.find({})
          .sort({date: 'desc'}).exec((err, quality) =>{
             let transport = Transport.find({})
             .sort({date: 'desc'}).exec((err, transport) => {
              res.render('dashboard', {
               user: req.user,
               "field": field,
               "production": production,
               "quality": quality,
               "transport": transport
             })
          })
       
        })
      })
     });
  });

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

// production page for post method
router.post('/production', (req, res) =>{
  const  { productID, productName, companyName, companyLocation, factoryLocation, companyIsoNumber, companyContact } = req.body;
  let errors = [];

  //checks for blank field
  if( !productID || !productName || !companyName || !companyLocation || !factoryLocation ||
   !companyIsoNumber || !companyContact ){
    errors.push({ msg: 'Please enter all fields' });
  }

    // check for iso number length if it less than 6 digits then don't accept
  if (companyIsoNumber.length < 6) {
      errors.push({ msg: 'ISO number must be at least 6 digits' });
    }

    // if finds any errors then show it
  if(errors.length > 0){
      res.render('production',{
        errors,
        productID,
        productName,
        companyName,
        companyLocation,
        factoryLocation,
        companyIsoNumber,
        companyContact
      });
    }
  // if it passes all the validation then it will store that data into production collections
    else{
      const newProduction = new Production({
        productID,
        productName,
        companyName,
        companyLocation,
        factoryLocation,
        companyIsoNumber,
        companyContact
      });
      newProduction.save().then( production =>{
         req.flash('success_msg',
        'Production data uploaded successfully');
         res.redirect('/dashboard');
      });
    }
});

// quality page for get method
router.get('/quality', ensureAuthenticated, (req, res) =>
  res.render('quality', {
    user: req.user
  })
);

// quality page for post method
router.post('/quality', (req, res) =>{
  const  { productID, productName, qcTests, qcResult, qcName, qcNidNumber, qcContact } = req.body;
  let errors = [];

  //checks for blank field
  if( !productID || !productName || !qcTests || !qcResult || !qcName || !qcNidNumber || !qcContact ){
    errors.push({ msg: 'Please enter all fields' });
  }

    // check for quality controller nid number length if it less than 12 digits then don't accept
  if (qcNidNumber.length < 17) {
      errors.push({ msg: 'Nid number must be at least 17 digits' });
    }

    // if finds any errors then show it
  if(errors.length > 0){
      res.render('quality',{
        errors,
        productID,
        productName,
        qcTests,
        qcResult,
        qcName,
        qcNidNumber,
        qcContact
      });
    }
  // if it passes all the validation then it will store that data into production collections
    else{
      const newQuality = new Quality({
        productID,
        productName,
        qcTests,
        qcResult,
        qcName,
        qcNidNumber,
        qcContact
      });
      newQuality.save().then( quality =>{
         req.flash('success_msg',
           'Quality control data uploaded successfully');
         res.redirect('/dashboard');
      });
    }
});

// transport page for get method
router.get('/transport', ensureAuthenticated, (req, res) =>
  res.render('transport', {
    user: req.user
  })
);

// transport page for post method
router.post('/transport', (req, res) =>{
  const  { productID, productName, companyName, companyLocation, companyContact, veheicleNumber, driverName, driverNidNumber, driverMobile } = req.body;
  let errors = [];

  //checks for blank field
  if( !productID || !productName || !companyName || !companyLocation || !companyContact || !veheicleNumber ||!driverName || !driverNidNumber || !driverMobile ){
    errors.push({ msg: 'Please enter all fields' });
  }

    // check for driver nid number length if it less than 12 digits then don't accept
  if (driverNidNumber.length < 17) {
      errors.push({ msg: 'Nid number must be at least 17 digits' });
    }

      // check for driver nid number length if it less than 12 digits then don't accept
  if (driverMobile.length < 11) {
      errors.push({ msg: 'Mobile must be at least 11 digits' });
    }   

    // if finds any errors then show it
  if(errors.length > 0){
      res.render('transport',{
        errors,
        productID,
        productName,
        companyName,
        companyLocation,
        companyContact,
        veheicleNumber,
        driverName,
        driverNidNumber,
        driverMobile
      });
    }
  // if it passes all the validation then it will store that data into production collections
    else{
      const newTransport = new Transport({
        productID,
        productName,
        companyName,
        companyLocation,
        companyContact,
        veheicleNumber,
        driverName,
        driverNidNumber,
        driverMobile
      });
      newTransport.save().then( transport =>{
         req.flash('success_msg',
           'Transport data uploaded successfully');
         res.redirect('/dashboard');
      });
    }
});

module.exports = router;