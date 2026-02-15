const jwt = require("jsonwebtoken");
const StudentModel = require("../models/students.model");
const bcrypt = require("bcrypt");

const createToken = async (_request, response) => {
    try {
        // jwt -> header.payload.signature -> 
        const token = jwt.sign({ sub: "testing" }, "sjhdgf874y873yhirwiuerhi", {
            expiresIn: 10
        })
        return response.status(200).send({ token });
    } catch (error) {
        return response.status(500).send({ message: error.message || "Some error occurred" })   
    }
}

const verifyToken = async (request, response) => {
    try {
        const bearerToken = request.headers.authorization;
        const token = bearerToken.split(" ")?.[1];
        try {
            const decoded = jwt.verify(token, "sjhdgf874y873yhirwiuerhi");
            if (decoded) {
                const currentTime = Math.floor(Date.now() / 1000)
                return response.status(200).send({
                    message: "Authorized",
                    session_expires_in: decoded.exp - currentTime
                })
            }
            return response.status(401).send({ message: "Unauthorized" })
        } catch (err) {
            return response.status(401).send({ message: "Unauthorized" })
        }
    } catch (error) {
        return response.status(500).send({ message: error.message || "Some error occurred" })   
    }
}

const studentSignup = async (request, response) => {
    try {
        const { email, fullName, studentId, password } = request.body;
        if(!email || !fullName || !studentId || !password) {
            return response.status(400).send({
                message: "All fields are required"
            });    
        }
        // complete: validate using regex
        const student = await StudentModel.findOne({ $or: [{ email }, { student_id: studentId }] });
        if (student) {
            if (student.email === email) {
                return response.status(409).send({
                    message: "Email already in use"
                })
            }
            if(student.student_id == studentId) {
                return response.status(409).send({
                    message: "Student ID already in use"
                })
            }
        }
        const userObj = {
            student_id: studentId,
            email,
            name: fullName,
            password
        }
        userObj.password = await bcrypt.hash(password, 10);
        const user = await StudentModel.create(userObj);
        if(!user) {
            return response.status(500).send({
                message: "Some error occurred"
            })
        }
        return response.status(200).send({
            message: "User created successfully",
        })
    } catch (err) {
        return response.status(500).send({
            message: err.message || "Some error occurred"
        })
    }
}

const studentLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        // complete validation
        const student = await StudentModel.findOne({ email });
        if (!student) {
            return response.status(404).send({
                message: "Student not found!"
            })
        }
        const isMatched = await bcrypt.compare(password, student.password);
        if (!isMatched) {
            return response.status(400).send({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({
            student: {
                id: student.student_id
            }
        }, process.env.JWT_PRIVATE_KEY, {
            expiresIn: 3600 // 1hr in seconds
        })
        return response.status(200).send({
            message: "Login success",
            token
        })
    } catch (err) {
        return response.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const testFunc = async (request, response) => {
    return response.status(200).send({ message: "SUCCESS" });
}

module.exports = { createToken, verifyToken, studentSignup, studentLogin, testFunc }