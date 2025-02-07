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
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: " Invalid credentials " });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const payload = {
            id: user._id,
            name: user.name,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.json({ token, message: "Login successfully" }).status(200)
    }
    catch (err) {
        next(err)
    }
})
