const mongoose = require("mongoose");
let courseSchema = new mongoose.Schema({
    name: String,
    code: String,
    description: String,

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    bgImgUrl: String

});

module.exports = mongoose.model("Course", courseSchema);