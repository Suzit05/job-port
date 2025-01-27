const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"], //enum stats for status
        default: "pending",
        required: true,
    }
})


module.exports = mongoose.model("Application", application)




