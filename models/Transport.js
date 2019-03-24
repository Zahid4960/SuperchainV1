/* Database model named Transport.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* transport schema */
const TransportSchema = mongoose.Schema({
	/* For transport's product id */
	productID: {
		type: String
	},
	/* For transport's product name */
	productName:{
		type: String
	},
	/* For transportation company name */
    companyName: {
		type: String
	},
	/* For transportation company  address */
	companyLocation: {
		type: String
	},
	/* For transportation company contact */
	companyContact: {
		type: String
	},
	/* For transportation company veheicle number that used for transportation */
	veheicleNumber: {
		type: String
	},
	/* For transportation company's driver name */
	driverName: {
		type: String
	},
	/* For transportation company's driver nid number */
	driverNidNumber: {
		type: String
	},
	/* For transportation company's driver mobile number */
	driverMobile: {
		type: String
	},
	/* For current date and time  at the time of uploading transport data */
	date: {
    type: Date,
    default: Date.now
  }
});

/* For creating new tarnsport and save their information into mongodb database(SuperchainV1).
We will get all the information from upload transport data form*/
const Transport = mongoose.model('Transport', TransportSchema);
module.exports = Transport;