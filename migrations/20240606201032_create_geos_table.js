/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('geos', (table) => {
        table.integer('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .references('business.user_id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table.json('geoData').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('geos');
};
