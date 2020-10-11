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

    if (!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        await connection('service').insert({
            company_cnpj: cnpj,
            title,
            description,
            price,
            is_unitary_price,
            is_subscription,
            subscription_span,
            discount_percentage,
            is_active
        });

        return response.json({
            status: 'Service created'
        });
    } catch (err) {
        return next(err);
    }
}