const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// by using this model we can catch and fetch all the users information
const User = require('../models/User'); 
// by using this model we can catch and fetch all the production data
const Production = require('../models/Production');


// function for edit production data
function editRecord(req, res) {
    Production.findOneAndUpdate({ productID: req.body.productID }, req.body, { new: true }, (err, production) => {
        if (!err) { 
            req.flash('success_msg',
               'Production data edited  successfully');
             res.redirect('/dashboard'); 
         }
        else {
                console.log('Error during record update : ' + err);
        }
    });
}

// routes for edit any production data
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
     Production.findById( req.params.id, (err, production) =>{
        if(! err){
            res.render('editProduction',{
                "production": production
            })
        }
     });
});

// routes for edit any field data by using editRecord function
router.post('/edit', ensureAuthenticated, (req, res) => {
        editRecord(req, res);
});

// routes for delete any production data by fetching its id
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    Production.findByIdAndRemove(req.params.id, (err, production) => {
        if (!err) {
            req.flash('success_msg',
               'Production data deleted successfully');
             res.redirect('/dashboard'); 
        }
        else { 
            console.log('Error in field data delete :' + err); 
        }
    });
});


module.exports = router;