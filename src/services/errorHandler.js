module.exports = function (error, _, response, next) {
    if (error) {
        console.error(error);
        response
            .status(500)
            .json({
                error: error.message
            })
    } else {
        return next();
    }
}