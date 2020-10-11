const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { with: _with } = request.params;

    const withCnpj = _with.replace(/\D/g, '');

    if(!cnpj || !withCnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        const messages = await connection('message')
            .where(query => query.where('to_cnpj', cnpj).andWhere('from_cnpj', withCnpj))
            .orWhere(query => query.where('from_cnpj', cnpj).andWhere('to_cnpj', withCnpj))
            .select('*');

        if(!messages) {
            return response.status(404).json({
                error: 'Messages for company not found'
            });
        }

        const sent = messages.filter(message => message.from_cnpj === cnpj).map(e => ({ ...e, from_cnpj: undefined, to_cnpj: undefined }));
        const received = messages.filter(message => message.to_cnpj === cnpj).map(e => ({ ...e, from_cnpj: undefined, to_cnpj: undefined }));

        return response.json({ sent, received });
    } catch (err) {
        return next(err);
    }
}