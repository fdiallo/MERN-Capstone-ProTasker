const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../models/User.js')

const authMiddleware = require('../middleware/auth.js')

const secret = process.env.JWT_SECRET
const expiration = '24h'

router.post('/register', async (req, res) => {
    try {

        const valid=await User.findOne({username: req.body.username})
        if(valid){
            res.json({error: "unavailable"})
            return
        }
        const userDB = await User.create({
            ...req.body
        })

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

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }

})

router.post('/login', async (req, res) => {
    try {
        // find the user
        const user = await User.findOne({ username: req.body.username })
        // check if the user exists
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' })
        }
        // check the password
        const correctPassword = await user.isCorrectPassword(req.body.password)

        if (!correctPassword) {
            return res.status(400).json({ message: 'Incorrect username or password' })
        }

        // create a token
        const payload = { 
            username: user.username,  
            email: user.email,
            _id: user._id
        }

         // create a token
        const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
        delete user.password
        res.status(200).json({ token, user })

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

// verify our logged in user's token
router.use(authMiddleware)

// after verification send back the user details (payload)
router.get('/', (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router



// const express = require('express')
// const jwt = require('jsonwebtoken')

// const router = express.Router()

// const User = require('../models/User.js')

// const authMiddleware = require('../middleware/auth.js')

// const secret = process.env.JWT_SECRET
// const expiration = '24h'

// router.post('/register', async (req, res) => {
//     try {

//         const valid=await User.findOne({username: req.body.username})
//         if(valid){
//             res.json({error: "unavailable"})
//             return
//         }
//         const userDB = await User.create({
//             ...req.body
//         })

//         const payload = { 
//             username: userDB.username,  
//             email: userDB.email,
//             _id: userDB._id
//         }

//          // create a token
//         const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
//         const user = {
//             username: userDB.username,
//             email: userDB.email,
//             _id: userDB._id
//         }
//         res.status(201).json({ token, user })

//     } catch(err) {
//         console.log(err.message)
//         res.status(400).json({ message: err.message })
//     }

// })

// router.post('/login', async (req, res) => {
//     try {
//         // find the user
//         const user = await User.findOne({ username: req.body.username })
//         // check if the user exists
//         if (!user) {
//             return res.status(400).json({ message: 'Incorrect username or password' })
//         }
//         // check the password
//         const correctPassword = await user.isCorrectPassword(req.body.password)

//         if (!correctPassword) {
//             return res.status(400).json({ message: 'Incorrect username or password' })
//         }

//         // create a token
//         const payload = { 
//             username: user.username,  
//             email: user.email,
//             _id: user._id
//         }

//          // create a token
//         const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
//         delete user.password
//         res.status(200).json({ token, user })

//     } catch(err) {
//         console.log(err.message)
//         res.status(400).json({ message: err.message })
//     }
// })

// // verify our logged in user's token
// router.use(authMiddleware)

// // after verification send back the user details (payload)
// router.get('/', (req, res) => {
//     res.status(200).json(req.user)
// })

// module.exports = router








// const express = require('express')
// const jwt = require('jsonwebtoken')
// const router = express.Router()
// const User = require('../models/User.js')
// const secret = process.env.JWT_SECRET
// const expiration = '24h'

// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const userExists = await User.findOne({ email })

//         if (userExists) return res.status(400).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const userDB = await User.create({ name, email, password: hashedPassword });


//         const payload = {
//             username: userDB.username,
//             email: userDB.email,
//             _id: userDB._id
//         }

//         // create a token
//         const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration })
//         const user = {
//             username: userDB.username,
//             email: userDB.email,
//             _id: userDB._id
//         }
//         res.status(201).json({ token, user })

//     } catch (err) {
//         console.log(err.message)
//         res.status(400).json({ message: err.message })
//     }

// })



// module.exports = router