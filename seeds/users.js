/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const usersData = require('../data/users.json');

exports.seed = async function(knex) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  await knex('users').del()
  await knex('users').insert(usersData);
};