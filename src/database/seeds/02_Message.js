module.exports = {
    async seed(knex) {
        await knex('message').insert([
            {
                from_cnpj: '46025089000141',
                to_cnpj: '29901954000157',
                content: 'Boa tarde, você teria interesse em uma parceria?'
            },
            {
                from_cnpj: '29901954000157',
                to_cnpj: '46025089000141',
                content: 'Boa tarde, acredito que uma parceria seria interessante para nossos negócios.'
            },
            {
                from_cnpj: '46025089000141',
                to_cnpj: '29901954000157',
                content: 'Perfeito, posso te chamar no LinkedIn?'
            },
            {
                from_cnpj: '29901954000157',
                to_cnpj: '46025089000141',
                content: 'Claro!'
            }
        ]);
    }
}