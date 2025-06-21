const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/db')

const PORT = process.env.PORT
const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", require('./routes/auth.routes'))
app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})