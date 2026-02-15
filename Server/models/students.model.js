const { Schema, model } = require("mongoose");

const schema = new Schema({
    student_id: {
        type: Number,
        required: [true, "Student ID is required"],
        unique: [true, "Student ID is already in use"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already in use"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

const StudentModel = model("students", schema);

module.exports = StudentModel;