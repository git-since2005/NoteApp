const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/Accounts'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected!!!")
    })
}



module.exports = connectToMongo