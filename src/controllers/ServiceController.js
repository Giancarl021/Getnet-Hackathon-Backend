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
            .select('*')
            .where('id', id)
            .first();

        if(!service) {
            return response.status(404).json({
                error: 'Service not found'
            });
        }

        return response.json(service);
    } catch (err) {
        return next(err);
    }
}