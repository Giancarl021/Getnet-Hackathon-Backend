module.exports = {
    async up(knex) {
        return knex.schema.createTable('trade', table => {
            table.increments('id').primary();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('from_cnpj').references('cnpj').inTable('company');
            table.string('to_cnpj').references('cnpj').inTable('company');
            table.string('service_id').references('cnpj').inTable('company');
            table.double('value').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('trade');
    }
}