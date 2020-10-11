require('dotenv').config();
const bcrypt = require('bcrypt');

const mockPassword = process.env.MOCK_PASSWORD || 'senha';
console.log(`[ENVIRONMENT] Mock password: ${mockPassword}`);

const password = bcrypt.hashSync(mockPassword, Math.floor(Math.random() * 10));

module.exports = {
    async seed(knex) {
        await knex('company').insert([
            {
                cnpj: '46025089000141',
                name: 'Ricardo Camisetas',
                getnet_id: 'a968fd33-ca30-4ebe-b242-4d6328aeaada',
                password,
                longitude: -21.95052894,
                latitude: -49.00601864
            },
            {
                cnpj: '29901954000157',
                name: 'Aurora Marketing Digital',
                getnet_id: 'a968fd33-ca30-4ebe-b242-4d6328aeaadb',
                password,
                longitude: -21.9549806,
                latitude: -49.0232348
            }
        ]);
    }
}