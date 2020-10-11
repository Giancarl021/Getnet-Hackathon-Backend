const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;

    const {
        title,
        description,
        price,
        is_unitary_price = false,
        is_subscription,
        subscription_span,
        discount_percentage,
        is_active = true
    } = request.body;

    if (!title || !description || !price || !discount_percentage || (is_subscription && !subscription_span)) {
        return response.status(400).json({
            error: 'Missing required fields'
        });
    }

    const service = await connection('service')
        .first()
        .where('company_cnpj', cnpj)
        .select(1);

    if (service) return response.status(400).json({
        error: 'You already have a service registered'
    });

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