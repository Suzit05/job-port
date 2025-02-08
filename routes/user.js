const express = require("express");
const userModel = require("../models/user.model");
const applicatonModel = require("../models/application.model");
const applicationModel = require("../models/application.model");
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

//api/user/jobs?createdJobs=true&savedJobs=false&appliedJobs=true

router.get("/jobs", async (req, res, next) => {
    try {
        const { createdJobs, savedJobs, appliedJobs } = req.query;
        const jobs = await userModel.findById(req.user.id)
        if (!jobs) {
            return res.status(404).json({ message: "User not found" })
        }

        const query = {}
        if (createdJobs) {
            query.createdJobs = true;
        }
        if (savedJobs) {
            query.savedJobs = true;
        }
        if (appliedJobs) {
            query.appliedJobs = true;
        }

        else {
            const jobs = await userModel.findById(req.user.id).select({ ...query })
            return res.status(200).json(jobs)
        }
    }
    catch (err) {
        next(err)
    }
})

router.get("/status", async (req, res, next) => {
    try {
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const applications = await applicatonModel.find({ user: id });
        const accceptedApplications = applications.filter(app => app.status === "accepted"); //accepted app hi dikhega
        return res.json({ accceptedApplications }).status(200)
    }
    catch (err) {
        next(err)
    }
})

//create filters for pending and rejected
//create apis for counting application (individually ) and cumulatively







module.exports = router