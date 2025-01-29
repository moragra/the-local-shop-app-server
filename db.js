require('dotenv').config()
const knex = require('knex')
const config = require('./knexfile')
const environment = process.env.NODE_ENV || 'development'

// console.log('Config:', config)
// console.log('Environment:', environment)
// console.log('Selected config:', config[environment])

const db = knex(config[environment])

module.exports = db