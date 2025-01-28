const express = require("express")
const router = express.Router()
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let hashPassword = bcrypt.hashSync(password, 10)
        const user = new userModel({
            name,
            email,
            password: hashPassword
        })

        await user.save();
        res.json({ message: "User registered successfully" }).status(201)

    }
    catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        //start coding from here
        bcrypt.compare(password, hashPassword, function (err, result) {

        })

    }
    catch (err) {
        next(err)
    }
})
