const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// by using this model we can catch and fetch all the users information
const User = require('../models/User'); 
// by using this model we can catch and fetch all the quality control data
const Quality = require('../models/Quality');


// function for edit quality control data
function editRecord(req, res) {
    Quality.findOneAndUpdate({ productID: req.body.productID }, req.body, { new: true }, (err, quality) => {
        if (!err) { 
            req.flash('success_msg',
               'Quality control data edited successfully');
             res.redirect('/dashboard'); 
         }
        else {
                console.log('Error during record update : ' + err);
        }
    });
}

// routes for edit any quality control data
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
     Quality.findById( req.params.id, (err, quality) =>{
        if(! err){
            res.render('editQuality',{
                "quality": quality
            })
        }
     });
});

// routes for edit any quality control data by using editRecord function
router.post('/edit', ensureAuthenticated, (req, res) => {
        editRecord(req, res);
});

// routes for delete any quality control data by fetching its id
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    Quality.findByIdAndRemove(req.params.id, (err, quality) => {
        if (!err) {
            req.flash('success_msg',
               'Quality control data deleted successfully');
             res.redirect('/dashboard'); 
        }
        else { 
            console.log('Error in field data delete :' + err); 
        }
    });
});


module.exports = router;