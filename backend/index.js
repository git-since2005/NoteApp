require('dotenv').config()
const connectToMongo = require('./db')
const express = require("express");
const cors = require('cors')

connectToMongo();

const app = express();
const port = 5000

app.use(express.json())
app.use(cors({
    origin: "https://noteapp-ultimate.netlify.app"
}))

app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes/', require('./routes/notes'))
app.use('/', (req, res)=>{
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log("Listening to port", port)
})