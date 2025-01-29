const db = require('../db')
const jwt = require('jsonwebtoken')

// const secret = 

function profile(req, res, next){
    const {authorization} = req.headers
    try {
        if (!authorization) {
            return res.status(401).json({error: 'No token provided'})
        }

        const token = authorization.slice("Bearer ".length)
        jwt.verify(token, process.env.SECRET, async (err, payload) =>{
            if(err){
                res.status(401).json({error: 'Failed, not authorized'})
            } else {
                req.user = payload
                next()
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

function profileRes(req, res){
    res.json(req.user)
}

module.exports = {
    profile,
    profileRes
};