const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const qr = require('qr-image');

const User = require('../models/User');
const Field = require('../models/Field');
const Production = require('../models/Production');
const Quality = require('../models/Quality');
const Transport = require('../models/Transport');


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

// qr code page for get method
router.get('/qrCode', ensureAuthenticated,(req, res) => 
  res.render('qrCode', {
    user: req.user
    })
  );

// qrcode page for post method
router.post('/qrCode', ensureAuthenticated, (req, res) => {
  const { search } = req.body;
  let errors = [];
  // if search box is blank then it will redirected to search page
  if(!search){
    errors.push({ msg: 'Please enter a productID which qr code to be generated'});
    res.render('qrCode', {errors});
  }else{
  // query for enter productID from field, production, quality and transport collections
  let field = Field.findOne({ productID: search}).then( field => {
    let production = Production.findOne({ productID: search}).then( production =>{
      let quality = Quality.findOne({ productID: search }).then( quality => {
        let transport = Transport.findOne({ productID: search }).then( transport => {
          // if enter product id not found then redirected to qr code page
          if( !field || !production || !quality || !transport){
            errors.push({ msg: 'Details not found for this productID so qr code cannot be generated'});
            res.render('qrCode', {errors});
          }
          // if all goes well means find product id from all the table then render that on result page
          else{
            // for field data 
            const productID = field.productID;
            const productName = field.productName;
            const fieldLocation = field.fieldLocation;
            const farmerName = field.farmerName;
            const farmerMobile = field.farmerMobile;
            const farmerNid = field.farmerNid;
            const fDate = field.date;


            // for production data
            const companyName = production.companyName;
            const companyLocation = production.companyLocation;
            const companyIsoNumber = production.companyIsoNumber;
            const companyContact = production.companyContact;
            const pDate = production.date;

           const code = qr.image(
            '       ProductID: ' + productID+
            '\n  Product Name: ' + productName+
            '\n-------------------------------------------\n' +
            '                Field Data         ' +
            '\n Field Location: ' +fieldLocation+
            '\n Farmer Name: ' +farmerName+
            '\n Farmer Mobile: ' +farmerMobile+
            '\n Farmer Nid: ' +farmerNid+
            '\n Date: ' +fDate+
            '\n-------------------------------------------\n' +
            '              Production Data         ' +
            '\n Company Name: ' +companyName+
            '\n Address: ' +companyLocation+
            '\n ISO Number: ' +companyIsoNumber+
            '\n Contact: ' +companyContact+
            '\n Date: ' +pDate+
            { type: 'png'});
            res.setHeader('Content-type', 'image/png');
            code.pipe(res);
          
          }
      })
    })
   })   
  });
  }
});



module.exports = router;