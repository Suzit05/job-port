const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    application: {
        type: Schema.types.ObjectId,
        ref: "Application",
        required: true
    }

})

module.exports = mongoose.model("Job", jobSchema)