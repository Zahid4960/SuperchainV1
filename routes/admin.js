const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const qr = require('qr-image');
const sha256 = require('sha256')

const User = require('../models/User');
const Field = require('../models/Field');
const Production = require('../models/Production');
const Quality = require('../models/Quality');
const Transport = require('../models/Transport');
const Blockchain = require('../models/Blockchain');


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

            // for quality control data
            const qcTests = quality.qcTests;
            const qcResult = quality.qcResult;
            const qcName = quality.qcName;
            const qcNidNumber = quality.qcNidNumber;
            const qcContact = quality.qcContact;
            const qDate = quality.date;

            // for transportation data
            const transportCompanyName = transport.companyName;
            const transportCompanyLocation = transport.companyLocation;
            const transportCompanyContact = transport.companyContact;
            const veheicleNumber = transport.veheicleNumber;
            const driverName = transport.driverName;
            const driverNidNumber = transport.driverNidNumber;
            const driverMobile = transport.driverMobile;
            const tDate = transport.date; 

           const code = qr.image(
            '       ProductID: ' + productID+
            '\n  Product Name: ' + productName+
            '\n-------------------------------------------------------\n' +
            '\n'+
            '                     Field Data         ' +
            '\n Field Location: ' +fieldLocation+
            '\n Farmer Name: ' +farmerName+
            '\n Farmer Mobile: ' +farmerMobile+
            '\n Farmer Nid: ' +farmerNid+
            '\n Date: ' +fDate+
            '\n-------------------------------------------------------\n' +
            '\n'+
            '                   Production Data         ' +
            '\n Company Name: ' +companyName+
            '\n Address: ' +companyLocation+
            '\n ISO Number: ' +companyIsoNumber+
            '\n Contact: ' +companyContact+
            '\n Date: ' +pDate+
            '\n-------------------------------------------------------\n' +
            '\n'+
            '               Quality Control Data         ' +
            '\n Quality Tests: ' +qcTests+
            '\n Result: ' +qcResult+
            '\n QC Name: ' +qcName+
            '\n QC NID: ' +qcNidNumber+
            '\n QC Contact: ' +qcContact+
            '\n Date: ' +qDate+
            '\n-------------------------------------------------------\n' +
            '\n'+
            '                  Transport Data         ' +
            '\n Transport Company: ' +transportCompanyName+
            '\n Address: ' +transportCompanyLocation+
            '\n Contact: ' +transportCompanyContact+
            '\n Veheicle Number: ' +veheicleNumber+
            '\n Driver Name: ' +driverName+
            '\n Driver NID: ' +driverNidNumber+
            '\n Driver Mobile: ' +driverMobile+
            '\n Date: ' +tDate+
            '\n'+
            { type: 'png'},);
            res.setHeader('Content-type', 'image/png');
            code.pipe(res);
          }
      })
    })
   })   
  });
  }
});

// blockchain page for get method
router.get('/blockchain', ensureAuthenticated,(req, res) => 
  res.render('blockchain', {
    user: req.user
    })
  );


// blockchain page for post method
router.post('/blockchain', ensureAuthenticated, (req, res) => {
  const { search } = req.body;
  let errors = [];
  // if search box is blank then it will redirected to search page
  if(!search){
    errors.push({ msg: 'Please enter a productID which data to be uploaded at blockchain'});
    res.render('blockchain', {errors});
  }else{
  // query for enter productID from field, production, quality and transport collections
  let field = Field.findOne({ productID: search}).then( field => {
    let production = Production.findOne({ productID: search}).then( production =>{
      let quality = Quality.findOne({ productID: search }).then( quality => {
        let transport = Transport.findOne({ productID: search }).then( transport => {
          // if enter product id not found then redirected to blockchain page
          if( !field || !production || !quality || !transport){
            errors.push({ msg: 'Details not found for this productID so qr code cannot be generated'});
            res.render('blockchain', {errors});
          }
          // if all goes well then show the details of the blockchian
          else{
            const productID = field.productID;
            const productName = field.productName;
            class Block {
                  constructor(index, timestamp, productID, prevHash) {
                  this.index = index;
                  this.timestamp = timestamp;
                  this.productID = productID;
                  this.prevHash = prevHash;
                  this.thisHash = sha256(
                  this.index + this.timestamp + this.data + this.prevHash
               );
            }
          }
            const createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');

            const nextBlock = (lastBlock, productID) =>
            new Block(lastBlock.index + 1, Date.now(), productID, lastBlock.thisHash);

            const createBlockchain = num => {
            const blockchain = [createGenesisBlock()];
            let previousBlock = blockchain[0];

            for (let i = 1; i < num; i += 1) {
              const blockToAdd = nextBlock(previousBlock, productID);
              blockchain.push(blockToAdd);
              previousBlock = blockToAdd;
            }

            console.log(blockchain);

           
          };
            const lengthToCreate = 2;
            createBlockchain(lengthToCreate);

       }
      })
    })
   })   
  });
  }
});




module.exports = router;