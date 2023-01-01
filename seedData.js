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
let imgUrls = [
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaguaO2HPGLhl6aWbqJAyPLypCqQQCljdK9RsGgHHxt3NNvY7jZ4DXQW6dRoCqeG-KR6U&usqp=CAU",
    "https://i.pinimg.com/originals/fa/12/8b/fa128b3bd59622936fb70c237275fb44.gif",
]



for (let i = 0; i < 3; i++) {
    users.push(new User({username: `test${i}@yahoo.com`, courses: []}));
    User.register(users[i], `${i}`);

}



for (let newUser of users) {
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * courseNames.length);
        let randBg =Math.floor(Math.random() * imgUrls.length)
        
        let course = new Course({name: courseNames[randomIndex], bgImgUrl: imgUrls[randBg], description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", students: [newUser._id]});
        newUser.courses.push(course._id);
    
        course.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    
        
    }
    
    newUser.save();
    

}


