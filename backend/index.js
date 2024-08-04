require('dotenv').config()
const connectToMongo = require('./db')
const express = require("express");
const cors = require('cors')

connectToMongo();

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes/', require('./routes/notes'))
app.use('/', (req, res)=>{
    console.log("Running!!!")
    res.send("Hello World")
})