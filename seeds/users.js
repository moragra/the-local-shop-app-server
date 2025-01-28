/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const usersData = require('../data/users.json');

exports.seed = async function(knex) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  await knex('users').del()
  await knex('users').insert([
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "password": "$2a$10$BYPQCBLTpVn6SJRQLmdsJebQC1/zXJYneL87q4RjKGWqHsy.NcbYe",
      "created_at": now,
      "updated_at": now
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "password": "$2a$10$9CGA1CjvjV.ytrlhYUn0YeLz72HGQ9D0O9AEZpERGuPffdKrAtQXa",
      "created_at": now,
      "updated_at": now
    }
  ]);
};