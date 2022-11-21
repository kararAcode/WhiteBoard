import mongoose from "mongoose";

let courseSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});