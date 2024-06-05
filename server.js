const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const PORT = 5050;

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to my Express App</h1>`);
});

const routes = require('./routes/routes')
app.use('/', routes)

app.listen(PORT, () =>{
    console.log(`running at http://localhost:${PORT}`)
})