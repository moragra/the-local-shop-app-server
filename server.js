const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const allowedOrigins = [
  'http://localhost:3001',  
  'https://the-local-shop-app-server.vercel.app', 
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(express.json())

const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes')
app.use('/', routes)

app.listen(PORT, () =>{
    console.log(`running at http://localhost:${PORT}`)
})