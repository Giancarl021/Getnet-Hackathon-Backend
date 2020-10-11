const connection = require('../database/connection');

module.exports = async function (request, response, next) {
    const { company: cnpj } = request.token;
    const { id: serviceId } = request.params;
    const { quantity } = request.query;

    if(!cnpj) {
        return response.status(400).json({
            error: 'Invalid Company CNPJ'
        });
    }

    if(!serviceId) {
        return response.status(400).json({
            error: 'Invalid Service ID'
        });
    }

    try {
        const service = await connection('service')
            .first()
            .where('id', serviceId)
            .select('price', 'is_unitary_price', 'is_subscription', 'subscription_span', 'is_active', 'company_cnpj');
    
        if(!service) {
            return response.status(400).json({
                status: 'Service not found'
            });
        }

        if(service.company_cnpj === cnpj) {
            return response.status(400).json({
                error: 'You cannot require your own service'
            });
        }

        let trade;
        
        const date = new Date(Date.now());
        date.setDate(date.getDate() + 7);

        if (service.is_subscription && service.subscription_span) {
            trade = [];

            for (let i = 0; i < service.subscription_span; i++) {
                trade.push({
                    from_cnpj: cnpj,
                    service_id: serviceId,
                    expires: date,
                    value: service.price
                });
                date.setMonth(date.getMonth() + 1);
            }
        } else {
            if(service.is_unitary_price && !quantity) {
                return response.status(400).json({
                    error: 'Invalid quantity'
                });
            }

            trade = {
                from_cnpj: cnpj,
                service_id: serviceId,
                expires: date,
                value: service.price * (service.is_unitary_price ? quantity : 1)
            };
        }

        await connection('trade').insert(trade);

        return response.json({
            status: 'Service requested'
        });
    } catch (err) {
        return next(err);
    }
}