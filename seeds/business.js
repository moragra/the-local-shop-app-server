/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const businessData = require('../data/business.json');

exports.seed = async function(knex) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const dataWithTimestamps = businessData.map(business => ({
    ...business,
    address: JSON.stringify(business.address),
    created_at: now,
    updated_at: now
  }));

  await knex('business').del()
  await knex('business').insert(dataWithTimestamps);
}