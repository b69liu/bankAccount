const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstname: { type : String  },
    lastname: { type : String  },
    email: { type : String , unique : true, required : true },
    username: { type : String , unique : true, required : true },
    phone: { type : String },
    password: { type : String, required : true },   // I usually store the login auth data into a separate table
    verificationCode: { type : String, required : true }
});

const User = model('User', userSchema, 'Users');
module.exports = User;