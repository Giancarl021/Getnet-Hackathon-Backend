const authenticate = require('../services/getnet-authentication');

module.exports = async function (_, response, next) {
    try {
        return response.json({
            bearer_token: await authenticate()
        });
    } catch (err) {
        return next(err);
    }
}