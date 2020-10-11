const connection = require('../database/connection');

module.exports = async function (request, response) {
    const { company: cnpj } = request.token;

    if(!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {

        const company = await connection('company')
            .first()
            .where('cnpj', cnpj)
            .select('*');

        if(!company) {
            return response.status(404).json({
                error: 'Company not found'
            });
        }

        return response.json({
            ...company,
            password: undefined
        });
    } catch (err) {
        return next(err);
    }
}