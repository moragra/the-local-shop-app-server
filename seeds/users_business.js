const usersData = require('../seed-data/users.js');
const businessData = require('../seed-data/business.js');

exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert(users);
  await knex("business").del();
  await knex("business").insert(business);
};
