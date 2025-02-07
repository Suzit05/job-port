const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router()


//get id from token
//get user from id
router.get("/", async (req, res, next) => {  // /api/user
    try {
        const { id } = req.user;
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user).status(200);

    }
    catch (err) {
        next(err)
    }
});

router.delete("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" }).status(200);
    }
    catch (err) {
        next(err)
    }
});

//put/patch--replace/update
router.put("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findByIdAndUpdate(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user).status(200);
    }
    catch (err) {
        next(err)
    }
});

//start from here






module.exports = router