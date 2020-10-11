const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { id } = request.params;

    if(!id) {
        return response.status(400).json({
            error: 'Invalid Service ID'
        })
    }

    try {

        const service = await connection('service')
            .first()
            .where('id', id)
            .select('*');

        if(!service) {
            return response.status(404).json({
                error: 'Service not found'
            });
        }

        return response.json({
            ...service,
            subscription_span: Number(service.subscription_span),
            is_active: Boolean(service.is_active),
            is_subscription: Boolean(service.is_subscription),
            is_unitary_price: Boolean(service.is_unitary_price)
        });
    } catch (err) {
        return next(err);
    }
}