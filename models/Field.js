/* Database model named Field.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* Field schema */
const FieldSchema = mongoose.Schema({
	/* For field's product id */
	productID: {
		type: String
	},
	/* For field's product name */
	productName:{
		type: String
	},
	/* For field's field location */
    fieldLocation: {
		type: String
	},
	/* For field's farmer name */
	farmerName: {
		type: String
	},
	/* For field's farmer mobile */
	farmerMobile: {
		type: String
	},
	/* For field's farmer nid */
	farmerNid: {
		type: String
	},
	/* For current date  and time at the time of uploading production data*/
	date: {
    type: Date,
    default: Date.now
  }
});

/* For creating new field and save their information into mongodb database(SuperchainV1).
We will get all the information from upload field data form*/
const Field = mongoose.model('Field', FieldSchema);
module.exports = Field;