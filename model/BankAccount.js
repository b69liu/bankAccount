const {Schema, model} = require('mongoose');

// this is the relational DB way to store bank account, but I could have inserted this account into the user
const bankAccountSchema = new Schema({
    owner: String,
    accountName: { type : String , unique : true, required : true },
    accountNumber: { type : String , unique : true, required : true },
    balance: Number,  // this should be integer with the unit of cents
});

const BankAccount = model('BankAccount', bankAccountSchema, 'BankAccounts');
module.exports = BankAccount;