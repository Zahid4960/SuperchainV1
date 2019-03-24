/* Database model named Quality.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* Quality schema */
const QualitySchema = mongoose.Schema({
	/* For quality's product id */
	productID: {
		type: String
	},
	/* For quality's product name */
	productName:{
		type: String
	},
	/* For quality tests name */
    qcTests: {
		type: String
	},
	/* For quality tests results */
	qcResult: {
		type: String
	},
	/* For quality controller name */
	qcName: {
		type: String
	},
	/* For quality controller nid number */
	qcNidNumber: {
		type: String
	},
	/* For quality controller contact */
	qcContact: {
		type: String
	},
	/* For current date and time  at the time of uploading quality control data */
	date: {
    type: Date,
    default: Date.now
  }
});

/* For creating new quality control and save their information into mongodb database(SuperchainV1).
We will get all the information from upload quality control data form*/
const Quality = mongoose.model('Quality', QualitySchema);
module.exports = Quality;