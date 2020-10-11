module.exports = async function (request, response, next) {
    const { refresh_token: key } = request.body;

    if(!key) {
        return response.status(401).json({
            error: 'No refresh token provided'
        });
    }

    const company = refreshTokens[key];

    if(!company) {
        return response.status(401).json({
            error: 'Invalid refresh token'
        });
    }

    request.body.cnpj = company.cnpj;
    request.body.password = company.password;

    delete refreshTokens[key];

    next();
}