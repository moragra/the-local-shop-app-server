/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const businessData = require('../data/business.json');

exports.seed = async function(knex) {
  await knex('business').del()
  await knex('business').insert(businessData);
};
