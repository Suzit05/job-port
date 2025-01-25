const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {  // /api/user
    try {
        res.send('welcome  to user routes')
    }
    catch (err) {
        next(err)
    }
})


module.exports = router