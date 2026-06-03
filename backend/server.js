const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const { connectDB }  = require("./utils/connection.js")
const userRoute = require("./routes/userRoutes.js")

connectDB()

const PORT = process.env.PORT || 4000

connectDB()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use('/api/users', userRoute)


app.get("/", (req, res)=>{
    res.send("Uder Log In Page")
})

app.listen(PORT, ()=>{
    console.log("Listening at http://localhost:"+PORT)
})

// // Dependencies
// const express = require("express")
// const app = express()
// require("dotenv").config()


// const { connectDB } = require("./utils/connection.js")

// connectDB()

// // Middleware
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())     // Middleware to parse JSON bodies

// // Routes


// // Port
// const PORT = process.env.PORT
// app.listen(PORT, () => { console.log(`Server listening on Port: ${PORT}`) })