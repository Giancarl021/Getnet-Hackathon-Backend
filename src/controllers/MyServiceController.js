const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;

    if(!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        const service = await connection('service')
            .first()
            .where('company_cnpj', cnpj)
            .select('*');
    
        if(!service) {
            return response.json({
                status: 'You do not have a service registered'
            });
        }

        return response.json({
            ...service,
            company_cnpj: undefined,
            is_active: Boolean(service.is_active),
            is_subscription: Boolean(service.is_subscription),
            is_unitary_price: Boolean(service.is_unitary_price)
        });
    } catch (err) {
        return next(err);
    }
}