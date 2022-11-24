const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course"
    }],

    userType: String
   
});

userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model("User", userSchema);