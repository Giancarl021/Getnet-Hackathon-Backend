const connection = require('../database/connection');

const tradesPerPage = process.env.TRADES_PER_PAGE || 10;

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { page } = request.query;

    if (!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        const history = (await connection('trade')
            .join('service', 'trade.service_id', 'service.id')
            .offset((Number(page) || 0) * tradesPerPage)
            .where(query => {
                query.where('trade.from_cnpj', cnpj);
                query.orWhere('service.company_cnpj', cnpj);
            })
            .andWhereNot('trade.is_pending', true)
            .limit(tradesPerPage)
            .select('trade.*')).map(item => ({
                ...item,
                service_id: Number(item.service_id),
                is_pending: Boolean(item.is_pending)
            }))


        return response.json(history);
    } catch (err) {
        return next(err);
    }
}