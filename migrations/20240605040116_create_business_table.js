/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('business', (table) => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .references('users.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
        table.string('shop_name').notNullable()
        table.string('category').notNullable()
        table.string('email').notNullable()
        table.string('phone').notNullable()
        table.string('address').notNullable()
        table.string('about').notNullable()
        table.string('website_url').notNullable()
        table.string('ig_url').notNullable()
        table.string('fb_url').notNullable()
        table.string('x_url').notNullable()
        table.string('li_url').notNullable()
        table.boolean('consent').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('business');
};