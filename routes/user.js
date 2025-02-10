const express = require("express");
const userModel = require("../models/user.model");
const applicationModel = require("../models/application.model");
const router = express.Router();

// Get user details
router.get("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

// Delete user
router.delete("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
});

// Update user
router.put("/", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

// Get user jobs
router.get("/jobs", async (req, res, next) => {
    try {
        const { createdJobs, savedJobs, appliedJobs } = req.query;
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const query = {};
        if (createdJobs) query.createdJobs = true;
        if (savedJobs) query.savedJobs = true;
        if (appliedJobs) query.appliedJobs = true;

        const jobs = await userModel.findById(req.user.id).select(query);
        return res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
});

// Get user application status (Accepted, Pending, Rejected)
router.get("/status", async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const applications = await applicationModel.find({ user: id });
        const acceptedApplications = applications.filter(app => app.status === "accepted");
        const pendingApplications = applications.filter(app => app.status === "pending");
        const rejectedApplications = applications.filter(app => app.status === "rejected");

        return res.status(200).json({ acceptedApplications, pendingApplications, rejectedApplications });
    } catch (err) {
        next(err);
    }
});

// API to count applications (individually and cumulatively)
router.get("/status/count", async (req, res, next) => {
    try {
        const { id } = req.user;
        const { status } = req.query; // Query for specific status count

        if (!id) {
            return res.status(400).json({ message: "User ID required" });
        }

        // Count all applications of the user
        if (status === "all") {
            const totalCount = await applicationModel.countDocuments({ user: id });
            return res.status(200).json({ totalCount });
        }

        // Count applications by status (pending, accepted, rejected)
        const validStatuses = ["pending", "accepted", "rejected"];
        if (status && validStatuses.includes(status)) {
            const count = await applicationModel.countDocuments({ user: id, status });
            return res.status(200).json({ status, count });
        }

        return res.status(400).json({ message: "Invalid status query" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
