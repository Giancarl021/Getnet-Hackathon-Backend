const connection = require('../database/connection');
const channelify = require('../util/channelify');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;

    if(!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        const messages = await connection('message')
            .where('to_cnpj', cnpj)
            .orWhere('from_cnpj', cnpj)
            .select('*');

        const sent = channelify(messages.filter(message => message.from_cnpj === cnpj), 'to_cnpj', true, 'from_cnpj');
        const received = channelify(messages.filter(message => message.to_cnpj === cnpj), 'from_cnpj', true, 'to_cnpj');

        if(!messages) {
            return response.status(404).json({
                error: 'Messages for company not found'
            });
        }

        return response.json({ sent, received });
    } catch (err) {
        return next(err);
    }
}