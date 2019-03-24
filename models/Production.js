/* Database model named Production.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* Field schema */
const ProductionSchema = mongoose.Schema({
	/* For productions's product id */
	productID: {
		type: String
	},
	/* For productions's product name */
	productName:{
		type: String
	},
	/* For production company name */
    companyName: {
		type: String
	},
	/* For production company headquarter address */
	companyLocation: {
		type: String
	},
	/* For production company factory location */
	factoryLocation: {
		type: String
	},
	/* For production company iso number */
	companyIsoNumber: {
		type: String
	},
	/* For production company contact number */
	companyContact: {
		type: String
	},
	/* For current date and time  at the time of uploading production data */
	date: {
    type: Date,
    default: Date.now
  }
});

/* For creating new production and save their information into mongodb database(SuperchainV1).
We will get all the information from upload production data form*/
const Production = mongoose.model('Production', ProductionSchema);
module.exports = Production;