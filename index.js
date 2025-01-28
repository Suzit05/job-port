const express = require("express")
const app = express()
const errorHandlers = require("./middleware/errorHandlers")
const userRoutes = require("./routes/user")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")


app.use(errorHandlers)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 3000

app.get("/", errorHandlers, async (req, res, next) => {
    try {

        res.send("welcome sjlgjkas index")
    }
    catch (err) {
        next(err)  //so that server doesnt break
    }

})


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
    mongoose.connect(process.env.MONGODB_URI, {

    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

})