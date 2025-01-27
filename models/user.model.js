const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    createdjobs: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    savedjobs: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    appliedjobs: {
        type: Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    }

})

module.exports = mongoose.model("User", userSchema)