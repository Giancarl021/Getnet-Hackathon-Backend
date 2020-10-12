const knex = require('knex');
const config = require('../../knexfile');

const environment = process.env.DEVELOPMENT.toLocaleLowerCase() === 'true' ? 'development' : 'production';
console.log(`[ENVIRONMENT] Environment: ${environment}`);

const connection = knex(config[environment]);

module.exports = connection;