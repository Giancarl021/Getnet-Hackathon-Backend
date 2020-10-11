const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');
const connection = require('../database/connection');

module.exports = async function (request, response) {
    const { cnpj: _cnpj, password } = request.body;

    const cnpj = _cnpj.replace(/\D/g, '');

    if (!cnpj) {
        return response.status(400).json({
            error: 'Missing CNPJ'
        });
    }

    if (!password) {
        return response.status(400).json({
            error: 'Missing Password'
        });
    }

    const rows = await connection('company').select('*').where('cnpj', cnpj);

    if (!rows.length) {
        return response.status(400).json({
            error: 'Company with this CNPJ not found'
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