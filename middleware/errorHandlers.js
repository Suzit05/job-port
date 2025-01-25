const errorHandlers = (req, res, err, next) => {
    if (req.headersSent) {
        return next(err)
    }
    res.status(500).json({
        message: err.message,
    })
}


module.exports = errorHandlers