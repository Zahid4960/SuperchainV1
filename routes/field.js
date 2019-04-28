const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// by using this model we can catch and fetch all the users information
const User = require('../models/User'); 
// by using this model we can catch and fetch all the field data
const Field = require('../models/Field');


// function for edit field data
function editRecord(req, res) {
    Field.findOneAndUpdate({ productID: req.body.productID }, req.body, { new: true }, (err, field) => {
        if (!err) { 
        	req.flash('success_msg',
               'Field data edited  successfully');
             res.redirect('/dashboard'); 
         }
        else {
                console.log('Error during record update : ' + err);
        }
    });
}

// routes for edit any field data
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	 Field.findById( req.params.id, (err, field) =>{
	 	if(! err){
	 		res.render('editField',{
	 			"field": field
	 		})
	 	}
	 });
});

// routes for edit any field data by using editRecord function
router.post('/edit', ensureAuthenticated, (req, res) => {
        editRecord(req, res);
});

// routes for delete any field data by fetching its id
router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    Field.findByIdAndRemove(req.params.id, (err, field) => {
        if (!err) {
        	req.flash('success_msg',
               'Field data deleted successfully');
             res.redirect('/dashboard'); 
        }
        else { 
        	console.log('Error in field data delete :' + err); 
        }
    });
});


module.exports = router;