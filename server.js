const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/routes')

const app = express()

// More specific CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://the-local-shop-app.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

// Add OPTIONS handling for preflight requests
app.options('*', cors())

app.use(express.json())
app.use('/', routes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})