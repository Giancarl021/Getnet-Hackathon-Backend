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
        const pending = (await connection('trade')
            .join('service', 'trade.service_id', 'service.id')
            .offset((Number(page) || 0) * tradesPerPage)
            .where('trade.from_cnpj', cnpj)
            .andWhere('trade.is_pending', true)
            .limit(tradesPerPage)
            .select('trade.*')).map(pending => ({
                ...pending,
                service_id: Number(pending.service_id),
                is_pending: Boolean(pending.is_pending)
            }))


        return response.json(pending);
    } catch (err) {
        return next(err);
    }
}