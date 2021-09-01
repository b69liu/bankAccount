const User = require('../model/User');
const {signToken, comparePassword} = require('../services/auth');
const bcrypt = require('bcryptjs');


/* sign in to get access token */
const signIn = async (req, res) => {
    try{
        const {username, password, verificationCode} = req.body;
        // get user password from database
        User.findOne({username}, (err, document) => {
            // check if user exists
            if(err || !document){
                console.log("Failed to find user when sign in", err);
                res.status(401).json({message:"Username or password incorrect."});
            }else{
                // check Verification Code
                if(document.verificationCode != verificationCode){
                    res.status(401).json({message:"Verification code incorrect."});
                }
                // compare the password and generate a jwt containing the userId
                const storedHashedPassword = document.password;
                if(comparePassword(password,storedHashedPassword)){
                    const accessToken = signToken(document._id);
                    res.status(200).json({accessToken});
                }else{
                    res.status(401).json({message:"Username or password incorrect."});
                }
    
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error});
    }
}

/* register a new user */
const signUp = async (req, res) => {
    try{
        const {firstname, lastname, email, username, phone, password} = req.body;
        // check if username or email already exists
        const document = await User.findOne({ $or:[ {username}, {email} ]});
        if(document){
            console.log("User already exists.");
            return res.status(401).json({message:"User already exists."});
        }
        // compute the password hash and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await User.create({ 
            firstname,
            lastname, 
            email, 
            username, 
            password: hash,
            phone,
            verificationCode: "random code"  // this code should be generated when user open the login page by a seperate endpoint
        });
        return res.status(201).json({message: "success."});
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error});
    }
}

/* get my user info */
const queryUserRolver = async (root, args, req) => {
    try{
        let userId = req.headers.userId;
        if(!userId){return null;}
        const document = await User.findOne({userId});
        document.user_id = document._id;
        return document;  
    }catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    signIn,
    signUp,
    queryUserRolver
}