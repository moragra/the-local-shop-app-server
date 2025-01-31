const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function signUp(req, res){
    const { name, email, password} = req.body
    try {
        const existingUser = await db('users').where('email', email).first()
        if(existingUser){
            return res.status(400).json({error: 'User with email already exists!'})
        }
        
        const hashedPassword = bcrypt.hashSync(password)
        const [newUser] = await db('users')
            .insert({
                name, 
                email, 
                password: hashedPassword
            })
            .returning(['id', 'name', 'email']) // Don't return the password

        res.status(201).json(newUser)
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({error: "We are sorry, we can't complete your request at the moment."})
    }
}

async function login(req, res){
    const { email, password } = req.body
    try {
        const user = await db('users').where('email', email).first()
        if(!user){
            return res.status(401).json({error: 'Invalid email or password'})
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(401).json({error: 'Invalid email or password'})
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: '24h' }
        )

        const { password: _, ...userWithoutPassword } = user
        res.json({
            user: userWithoutPassword,
            token
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({error: "We are sorry, we can't complete your request at the moment."})
    }
}

async function getProfile(req, res) {
    try {
        const user = await db('users')
            .select('id', 'name', 'email')
            .where('id', req.user.id)
            .first();
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    signUp,
    login,
    getProfile
}