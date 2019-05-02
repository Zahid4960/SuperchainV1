/* Database model named Blockchain.js */
/* For connection with mongodb */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SuperchainV1', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

/* Field schema */
const BlockchainSchema = mongoose.Schema({
	/* For blockchain's product id */
	productID: {
		type: String
	},
	/* For blockchain's product name */
	productName:{
		type: String
	},
	/* For blockchains's current hash */
    thisHash: {
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
const Blockchain = mongoose.model('Blockchain', BlockchainSchema);
module.exports = Blockchain;