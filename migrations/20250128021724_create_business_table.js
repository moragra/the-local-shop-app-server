/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('business', (table) => {
            table.increments('id').primary();
            table.integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
            table.string('shop_name').notNullable();
            table.string('category').notNullable();
            table.string('email').notNullable();
            table.string('phone').notNullable();
            table.jsonb('address').notNullable();
            table.text('about').notNullable();
            table.string('website_url');
            table.string('ig_url');
            table.string('fb_url');
            table.string('x_url');
            table.string('li_url');
            table.boolean('consent').notNullable();
            table.timestamps(true, true);
        })
        .then(() => {
            return knex.raw(`
                CREATE OR REPLACE FUNCTION update_timestamp()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = CURRENT_TIMESTAMP;
                    RETURN NEW;
                END;
                $$ language 'plpgsql';

                CREATE TRIGGER update_business_timestamp
                    BEFORE UPDATE ON business
                    FOR EACH ROW
                    EXECUTE FUNCTION update_timestamp();
            `);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .raw('DROP TRIGGER IF EXISTS update_business_timestamp ON business')
        .raw('DROP FUNCTION IF EXISTS update_timestamp')
        .dropTable('business');
};
