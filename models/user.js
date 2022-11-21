import mongoose from 'mongoose'

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

module.exports = new mongoose.Model("User", userSchema);