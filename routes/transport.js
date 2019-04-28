const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// by using this model we can catch and fetch all the users information
const User = require('../models/User'); 
// by using this model we can catch and fetch all the transport data
const Transport = require('../models/Transport');


// function for edit transport data
function editRecord(req, res) {
    Transport.findOneAndUpdate({ productID: req.body.productID }, req.body, { new: true }, (err, transport) => {
        if (!err) { 
            req.flash('success_msg',
               'Transport data edited successfully');
             res.redirect('/dashboard'); 
         }
        else {
                console.log('Error during record update : ' + err);
        }
    });
}

// routes for edit any transport data
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
     Transport.findById( req.params.id, (err, transport) =>{
        if(! err){
            res.render('editTransport',{
                "transport": transport
            })
        }
     });
});

// routes for edit any transport data by using editRecord function
router.post('/edit', ensureAuthenticated, (req, res) => {
        editRecord(req, res);
});

// routes for delete any transport data by fetching its id
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    Transport.findByIdAndRemove(req.params.id, (err, transport) => {
        if (!err) {
            req.flash('success_msg',
               'Transport data deleted successfully');
             res.redirect('/dashboard'); 
        }
        else { 
            console.log('Error in field data delete :' + err); 
        }
    });
});


module.exports = router;