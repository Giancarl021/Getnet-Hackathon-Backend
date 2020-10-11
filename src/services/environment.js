const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const createSecret = require('../util/secret');

module.exports = function () {
    dotenv.config();

    const dataPath = path.resolve(__dirname, '..', '..', 'data');

    const authPath = path.join(dataPath, 'auth.json');

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }

    fs.writeFileSync(authPath, JSON.stringify({
        secret: createSecret(),
        expiresIn: process.env.TOKEN_TTL || 3600
    }));
    
    console.log('[SECURITY] Generated new authentication secret on data/auth.json');

    global.refreshTokens = [];
    console.log('[SECURITY] Generated empty array of refresh tokens');
}