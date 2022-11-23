import mongoose from 'mongoose'
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course"
    }],

    userType: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.Model("User", userSchema);