const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Add email validation function
const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

async function signUp(req, res){
    const { name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    try {
        const existingUser = await db('users').where('email', email).first()
        if(existingUser){
            return res.status(400).json({error: 'Email already in use. Please use a different email or login.'})
        }
        
        if (!emailIsValid(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
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

async function login(req, res) {
    const { email, password } = req.body;

    // Validate user credentials
    const user = await db('users').where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
        { userId: user.id, email: user.email }, // Only include id and email in the token
        process.env.JWT_KEY,
        { expiresIn: '24h' }
    );

    // Return user data along with token
    res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name, // Include the name field
        token
    });
}

async function getProfile(req, res) {
    try {
        const user = await db('users')
            .select('id', 'name', 'email')
            .where('id', req.user.id)
            .first();
        console.log(user)
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