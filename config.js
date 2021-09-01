require("dotenv").config();
// const SECRET = process.env.SECRET || require('crypto').randomBytes(64).toString('hex');
const SECRET = "PLEASE USE PREVIOUS LINE IN PRODUCTION ENV";
const PORT = process.env.PORT || 3000;
const DATABASE_CONNECT_STRING = process.env.DATABASE_CONNECT_STRING;






module.exports = {
    SECRET,
    PORT,
    DATABASE_CONNECT_STRING
}