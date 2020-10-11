module.exports = {
    async seed(knex) {
        await knex('service').insert({
            from_cnpj: '46025089000141',
            title: 'Camisetas Personalizadas',
            description: 'Peça camisetas personalizadas para seus eventos da empresa',
            is_subscription: false,
            discount_percentage: 5
        });
    }
}