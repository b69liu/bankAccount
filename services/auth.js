const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {SECRET} = require('../config');



function signToken(userId){
    const token = jwt.sign({userId},SECRET, { expiresIn: '2592000s' });
    return token;
}


function comparePassword(passwordString, passwordHash) {
    return bcrypt.compareSync(
        passwordString,
        passwordHash
    );
}

// midware to block unauthenticated requests and to
// put user id from jwt to request header
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, SECRET, (err, decoded) => {
        
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        req.headers.userId = decoded.userId;
        next()
    })
}

module.exports = {
    authMiddleware,
    signToken,
    comparePassword,
}
