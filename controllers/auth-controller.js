const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('node:fs')

async function signUp(req, res){
    console.log('debug')
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
    console.log('debug')
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

async function profile(req, res, next){
    const {authorization} = req.headers
    
    try {
        const token = authorization.slice("Bearer ".lenght)
        jwt.verify(token, process.env.SECRET, async (err, payload) =>{
            if(err){
                res.status(401).json({error: 'Failed, not authorized'})
            } else {
                const userPwd = await knex('users').where('email', payload.email).first()
                const {password, ...user} = userPwd
                req.user = user
                next()
            }
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    signUp,
    login,
    profile
};