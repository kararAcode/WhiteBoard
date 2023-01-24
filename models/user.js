const mongoose = require("mongoose");
const Course = require("./course");
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

    userType: String // a usertype can either be a teacher or a student
   
});

// this class is going to store a bunch of helper methods
class User {
    async addCourse(code) {

        let course =  (await Course.find({})).filter((course) => {
            return course.code === code;
        })[0];

        course.students.push(this._id)
        this.courses.push(course._id);

        this.save();
        course.save();
    
    }
}

userSchema.loadClass(User);


userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model("User", userSchema);