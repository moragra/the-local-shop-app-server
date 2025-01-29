/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
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

                CREATE TRIGGER update_users_timestamp
                    BEFORE UPDATE ON users
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
        .raw('DROP TRIGGER IF EXISTS update_users_timestamp ON users')
        .raw('DROP FUNCTION IF EXISTS update_timestamp')
        .dropTable('users');
};
