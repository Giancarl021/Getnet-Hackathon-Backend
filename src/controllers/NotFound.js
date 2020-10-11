module.exports = function (request, response) {
    return response
        .status(404)
        .json({
            error: `Cannot ${request.method} on ${request.path}`
        });
}