const { where } = require('../database/connection');
const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { to: _to } = request.params;
    const { content } = request.body;

    const to = _to.replace(/\D/g, '');

    if(!cnpj || !to) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    if (!content) {
        return response.status(400).json({
            error: 'Empty content'
        });
    }

    try {

        const toCompany = await connection('company')
            .first()
            .where('cnpj', to)
            .andWhere('cnpj', '<>', cnpj)
            .select(1);

        if(!toCompany) {
            return response.status(400).json({
                error: 'Invalid recipient company'
            })
        }

        await connection('message').insert({
            from_cnpj: cnpj,
            to_cnpj: to,
            content
        });

        return response.json({
            status: 'Message sent successfully'
        });
    } catch (err) {
        return next(err);
    }
}