const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken')

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
                console.log(user)
                next()
            }
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    profile
};