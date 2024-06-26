const mongoose = require('mongoose')
const {Schema} = mongoose
// let string = "General"
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{type:String, require:true},
    description:{type:String},
    tag:{type:String, default:0},
    date:{type:Date, default:Date.now}
});

module.exports = mongoose.model('notes', NotesSchema)