module.exports = {
    async up(knex) {
        return knex.schema.createTable('message', table => {
            table.increments('id').primary();
            table.timestamp('created_at').defaultTo(Number(new Date(Date.now())));
            table.string('from_cnpj').references('cnpj').inTable('company');
            table.string('to_cnpj').references('cnpj').inTable('company');
            table.string('content').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('message');
    }
}