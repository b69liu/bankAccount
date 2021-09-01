const BankAccount = require('../model/BankAccount');
const ObjectId = require('mongoose').Types.ObjectId; 


/* create a new account */
const createAccountRolver = async (root, args, req) => {
    try{
        let userId = req.headers.userId;
        if(!userId){
            return {
                success: false,
                message: "Invalid user"
            };
        }
        const {accountName, accountNumber} = args;
        // check if the account name or account number duplicate
        // racing condition may occur when multple servers running
        const account = await BankAccount.findOne({ 
            owner: userId,
            $or:[{accountName}, {accountNumber}]
        });
        if(account){
            return {success: false, message: "Duplicated account"};
        }
        await BankAccount.create({ 
            owner: userId, 
            accountName,
            accountNumber,
            balance: 0
        });
        return {success: true, message: "Account created"}
    }catch(error){
        console.log(error);
        return {success: false, message: "Error creating account"}
    }
}

/* query all my accounts */
const findAccountsRolver = async (root, args, req) => {
    try{
        let userId = req.headers.userId;
        if(!userId){
            return {
                success: false,
                message: "Invalid user"
            };
        }
        const accounts = await BankAccount.find({ 
            owner: userId, 
        });
        // copy the field _id to account_id
        // and get the last 4 digits of the account number
        accounts.forEach(account => {
            account.account_id = account._id;
            account.lastFourDigits = account.accountNumber.slice(-4);
        });
        return accounts;
    }catch(error){
        console.log(error);
        return null;
    }
}


/* 
*  Deposite to an account 
*  This function should never be called by user in real world
*/
const depositeRolver = async (root, args, req) => {
    try{
        let userId = req.headers.userId;
        if(!userId){
            return {
                success: false,
                message: "Invalid user"
            };
        }
        // check account id
        let {accountId, amount} = args;
        if(!accountId){
            return {
                success: false,
                message: "Missing accountId"
            };
        }
        // check amount
        amount = parseInt(amount);
        if(amount < 1 || !amount){
            return {
                success: false,
                message: "Invalid amount"
            };
        }

        await BankAccount.findOneAndUpdate({
                _id: new ObjectId(accountId),
                owner: userId
            },
            {$inc: {'balance': amount}}, 
            {multi: false}
        );
        
        return {success: true, message:"Money deposited"};
    }catch(error){
        console.log(error);
        return null;
    }
}

/* 
*  withdraw from an account 
*  This function should never be called by user in real world
*/
const withdrawRolver = async (root, args, req) => {
    try{
        let userId = req.headers.userId;
        if(!userId){
            return {
                success: false,
                message: "Invalid user"
            };
        }
        // check account id
        let {accountId, amount} = args;
        if(!accountId){
            return {
                success: false,
                message: "Missing accountId"
            };
        }
        // check amount
        amount = parseInt(amount);
        if(amount < 1 || !amount){
            return {
                success: false,
                message: "Invalid amount"
            };
        }

        await BankAccount.findOneAndUpdate({
                _id: new ObjectId(accountId),
                owner: userId,
                balance: {$gte: amount}      // make sure there is enough balance
            },
            {$inc: {'balance': -amount}}, 
            {multi: false}
        );
        
        return {success: true, message:"Money withdrawn"};
    }catch(error){
        console.log(error);
        return null;
    }
}



module.exports = {
    createAccountRolver,
    findAccountsRolver,
    depositeRolver,
    withdrawRolver
}