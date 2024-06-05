const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function signUp(req, res){
    const  { name, email, password} = req.body
    const user = await knex('users').where('email', email).first()
    if(user){
        return res.status(400).send('User with email already exists!')
    }
    try {
        const pwd = bcrypt.hashSync(password)
        await knex('users').insert({name, email, password: pwd})
        res.json({sucess: true})
    } catch (error) {
        res.status(500).json("We are sorry, we can't complete your request at the moment.")
    }
}

async function login(req, res){
    const {email, password} = req.body
    const user = await knex('users').where('email', email).first()
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

module.exports = {
    signUp,
    login
};