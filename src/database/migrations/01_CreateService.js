module.exports = {
    async up(knex) {
        return knex.schema.createTable('service', table => {
            table.increments('id').primary();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('company_cnpj').references('cnpj').inTable('company');
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.double('price').notNullable();
            table.boolean('is_unitary_price').defaultTo(false);
            table.boolean('is_subscription').notNullable();
            table.integer('subscription_span').defaultTo(0);
            table.integer('discount_percentage').notNullable();
            table.boolean('is_active').defaultTo(true);
        });
    },

    async down(knex) {
        return knex.schema.dropTable('service');
    }
}