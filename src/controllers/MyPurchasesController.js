const connection = require('../database/connection');

const tradesPerPage = process.env.TRADES_PER_PAGE || 10;
console.log(`[ENVIRONMENT] Trades returned per page: ${tradesPerPage}`);

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { page } = request.query;

    if (!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        })
    }

    try {
        const purchases = (await connection('trade')
            .join('service', 'trade.service_id', 'service.id')
            .offset((Number(page) || 0) * tradesPerPage)
            .where('trade.from_cnpj', cnpj)
            .andWhereNot('trade.is_pending', true)
            .limit(tradesPerPage)
            .select('trade.*')).map(purchase => ({
                ...purchase,
                service_id: Number(purchase.service_id),
                is_pending: Boolean(purchase.is_pending)
            }))


        return response.json(purchases);
    } catch (err) {
        return next(err);
    }
}