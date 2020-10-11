const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { id } = request.params;

    if (!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    if (!id) return response.status(400).json({
        error: 'Invalid Trade ID'
    });

    try {
        await connection('trade')
        .where('id', id)
        .update({
            is_pending: false
        });

        return response.json({
            status: 'Trade paid'
        });
    } catch (err) {
        return next(err);
    }
}