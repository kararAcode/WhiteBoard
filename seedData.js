const mongoose = require("mongoose");
const User = require("./models/user");
const Course = require("./models/course");

require('dotenv').config({ path: require('find-config')('.env') })


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

User.remove({});
Course.remove({});

let users = [];
let courseNames = ["Chemistry", "Physics", "Biology", "English"]


for (let i = 0; i < 3; i++) {
    users.push(new User({username: `test${i}@yahoo.com`, courses: []}));
    User.register(users[i], `${i}`);

}



for (let newUser of users) {
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * courseNames.length);
        
        let course = new Course({name: courseNames[randomIndex], description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", students: [newUser._id]});
        newUser.courses.push(course._id);
    
        course.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    
        
    }
    
    newUser.save();
    

}


