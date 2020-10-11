const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;

    const {
        title,
        description,
        price,
        is_unitary_price,
        is_subscription,
        subscription_span,
        discount_percentage,
        is_active
    } = request.body;

    const row = {
        title,
        description,
        price,
        is_unitary_price,
        is_subscription,
        subscription_span,
        discount_percentage,
        is_active
    };

    for (const key in row) {
        if (row[key] === undefined || row[key] === null) delete row[key];
    }

    if (!Object.keys(row).length) return response.status(400).json({
        error: 'Empty update'
    });
    
    if (!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        await connection('service')
            .update(row)
            .where('company_cnpj', cnpj);

        return response.json({
            status: 'Service updated'
        });
    } catch (err) {
        return next(err);
    }
}