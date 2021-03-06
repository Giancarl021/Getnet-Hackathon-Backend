module.exports = {
    async up(knex) {
        return knex.schema.createTable('company', table => {
            table.string('cnpj').primary();
            table.string('name').notNullable();
            table.string('getnet_id').unique().notNullable();
            table.string('password').notNullable();
            table.double('longitude').notNullable();
            table.double('latitude').notNullable();
        });
    },

    async down(knex) {
        return knex.schema.dropTable('company');
    }
}