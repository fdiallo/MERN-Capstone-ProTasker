const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User.js')
const secret = process.env.JWT_SECRET
const expiration = '24h'

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userDB = await User.create({ name, email, password: hashedPassword });


        const payload = {
            username: userDB.username,
            email: userDB.email,
            _id: userDB._id
        }

        // create a token
        const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
        const user = {
            username: userDB.username,
            email: userDB.email,
            _id: userDB._id
        }
        res.status(201).json({ token, user })

    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }

})



module.exports = router