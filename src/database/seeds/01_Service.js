module.exports = {
    async seed(knex) {
        await knex('service').insert([
            {
                company_cnpj: '46025089000141',
                title: 'Camisetas Personalizadas',
                description: 'Peça camisetas personalizadas para seus eventos da empresa',
                is_subscription: false,
                price: 10,
                is_unitary_price: true,
                discount_percentage: 5
            },
            {
                company_cnpj: '29901954000157',
                title: 'Campanha de Marketing',
                description: 'Faça uma campanha de marketing para sua empresa',
                price: 100,
                is_unitary_price: false,
                is_subscription: true,
                subscription_span: 12,
                discount_percentage: 10
            }
        ]);
    }
}