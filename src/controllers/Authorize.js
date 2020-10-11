const bcrypt = require('bcrypt');
const generateToken = require('../util/generate-token');
const connection = require('../database/connection');

module.exports = async function (request, response) {
    const { cnpj, password } = request.body;

    if (!username) {
        return response.status(400).json({
            error: 'Missing username'
        });
    }

    const rows = await connection('company').select('*').where('cnpj', cnpj);

    if (!rows.length) {
        return response.status(400).json({
            error: 'An user with this username does not exists'
        });
    }

    const company = rows[0].cnpj;

    const result = bcrypt.compareSync(password, rows[0].password);

    if (!result) {
        return response.status(400).json({
            error: 'Wrong password'
        });
    }

    const { bearerToken, expiresIn, refreshToken } = generateToken({
        company: cnpj
    });

    refreshTokens[refreshToken] = { cnpj, password };

    return response.status(200).json({
        company,
        bearer_token: bearerToken,
        expires_in: expiresIn,
        refresh_token: refreshToken
    });
}