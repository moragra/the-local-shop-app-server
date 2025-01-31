const db = require('../db')
const jwt = require('jsonwebtoken')

function profile(req, res, next){
    const {authorization} = req.headers
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid or missing token' });
        }
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, async (err, payload) =>{
            if(err){
                res.status(401).json({error: 'Failed, not authorized'})
            } else {
                const user = await db('users').where({ id: payload.id }).first();
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                req.user = user;
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