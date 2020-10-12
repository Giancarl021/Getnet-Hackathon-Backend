module.exports = {
    async up(knex) {
        return knex.schema.createTable('trade', table => {
            table.increments('id').primary();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('from_cnpj').references('cnpj').inTable('company');
            table.integer('service_id').references('id').inTable('service');
            table.boolean('is_pending').defaultTo(true);
            table.timestamp('expires').notNullable();
            table.double('value').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('trade');
    }
}