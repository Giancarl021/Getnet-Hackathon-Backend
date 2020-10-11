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
            is_active: Boolean(service.is_active),
            is_subscription: Boolean(service.is_subscription)
        });
    } catch (err) {
        return next(err);
    }
}