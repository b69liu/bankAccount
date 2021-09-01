const mongoose = require("mongoose");
const {DATABASE_CONNECT_STRING} = require("./config");

const connectDatabase = ()=> {
    mongoose.connect(DATABASE_CONNECT_STRING, { useNewUrlParser: true,  useUnifiedTopology: true  }).then(
        () => {
          console.log("Mongoose connected successfully ");
        },
        (error) => {
          console.log("Mongoose could not connect to database: " + error);
        }
      );
}

module.exports = connectDatabase;