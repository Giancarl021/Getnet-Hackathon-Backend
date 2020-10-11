const connection = require('../database/connection');
const distance = require('../util/distance');

const servicesPerPage = process.env.SERVICES_PER_PAGE || 10;
console.log(`[ENV] Services returned per page: ${servicesPerPage}`);

module.exports = async function (request, response, next) {
    const {
        type,
        query: searchTerm,
        latitude,
        longitude,
        page
    } = request.query;

    let order = false;

    try {
        let rows = (await connection('service')
            .modify(query => {
                if (searchTerm) {
                    query.where('title', 'like', `%${searchTerm}%`);
                }

                if(Number(latitude) && Number(longitude)) {
                    query.join('company', 'company.cnpj', '=', 'service.company_cnpj');
                    query.select('service.*', 'company.latitude', 'company.longitude');
                    order = true;
                } else {
                    query.select('*');
                }

                if (type) {
                    if (type === 'subscription') {
                        query.where('is_subscription', 1);
                    } else if (type === 'unique_payment') {
                        query.whereNot('is_subscription', 1);
                    }
                }
            })
            .offset((Number(page) || 0) * servicesPerPage)
            .limit(servicesPerPage))
            .map(r => ({
                ...r,
                is_active: Boolean(r.is_active),
                is_subscription: Boolean(r.is_subscription)
            }));

        if (order) {
            const coord = { x: Number(latitude), y: Number(longitude) };
            const distances = rows.map(r => ({
                d: distance(coord, { x: r.latitude, y: r.longitude }),
                id: r.id
            })).sort((a, b) => a.d - b.d);
            const r = [];

            for (const item of distances) {
                r.push({...rows.find(e => e.id === item.id), latitude: undefined, longitude: undefined });
            }

            rows = r;
        }

        return response.json(rows);
    } catch (err) {
        return next(err);
    }
}