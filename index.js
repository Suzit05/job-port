const express = require("express")
const app = express()
const errorHandlers = require("./middleware/errorHandlers")
const userRoutes = require("./routes/user")
const dotenv = require("dotenv")
dotenv.config()


app.use(errorHandlers)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 3000

app.get("/", errorHandlers, async (req, res, next) => {
    try {

        res.send("welcome to index")
    }
    catch (err) {
        next(err)  //so that server doesnt break
    }

})


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})