const { createHash } = require('crypto');

module.exports = function () {
    const string = JSON.stringify({
            user: process.env.USER || '',
            password: process.env.USERNAME,
            timestamp: Date.now()
        },
        null,
        Math.floor(Math.random() * 16)
    )


    return createHash('sha256')
        .update(string)
        .digest('hex');
}