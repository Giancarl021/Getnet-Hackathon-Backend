const connection = require('../database/connection');

module.exports = async function (request, response) {
    const { cnpj: _cnpj } = request.params;

    const cnpj = _cnpj.replace(/\D/g, '');

    if(!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {

        const company = await connection('company')
            .first()
            .where('cnpj', cnpj)
            .select('name', 'cnpj', 'latitude', 'longitude');

        if(!company) {
            return response.status(404).json({
                error: 'Company not found'
            });
        }

        return response.json(company);
    } catch (err) {
        return next(err);
    }
}