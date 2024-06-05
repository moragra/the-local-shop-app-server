const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('node:fs')

async function signUp(req, res){
    const  { email, password} = req.body
    const users = getUsers()
    const user = users.find((user) => user.email === email)
    if(user){
        return res.status(400).send('User with email already exists!')
    }
    try {
        const pwd = bcrypt.hashSync(password)
        users.push({email, password: pwd})
        fs.writeFileSync('./data/users.json', JSON.stringify(users))
        res.json({sucess: true})
    } catch (error) {
        res.status(500).json("We are sorry, we can't complete your request at the moment.")
    }
}

async function login(req, res){
    const {email, password} = req.body
    const users = getUsers()
    const user = users.find((user) => user.email === email)
    if(!user){
        return res.status(400).send('Invalid email')
    }
    if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).send('Invalid password')
    }
    try {
        const token = jwt.sign({email: user.email, name: user.name}, process.env.SECRET)

        res.json({token})
        
    } catch (error) {
        res.status(401).json({error: {message: "Login failed"}})
    }
}

async function profile(req, res, next){
    const {authorization} = req.headers
    try {
        const token = authorization.slice("Bearer ".lenght)
        jwt.verify(token, process.env.SECRET, (err, payload) =>{
            if(err){
                res.status(401).json({error: 'Failed, not authorized'})
            } else {
                const users = getUsers()
                const userPwd = users.find((user) => user.email === payload.email)
                const {password, ...user} = userPwd
                req.user = user
                next()
            }
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

function getUsers() {
    return JSON.parse(fs.readFileSync("./data/users.json"));
  }

module.exports = {
    signUp,
    login,
    profile
};