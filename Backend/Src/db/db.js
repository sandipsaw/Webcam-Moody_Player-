const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Error occured while connecting to mongodb",err)
    })
}

module.exports = connectToDB