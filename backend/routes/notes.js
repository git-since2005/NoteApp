const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Note')

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal sever error")
    }
})

router.get('/addnote', fetchuser, async(req,res)=>{
    
    
    const {title, description, tag} = req.body
    
    // tag = tag===''?'General':tag

    if(!title){
        return res.status(500).send({errors:"Title is empty!!"})
    }
    
        try {

        const note = new Note({
            title, description, tag, user:req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal sever error")
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    let note = await Note.findById(req.params.id)
    if(!note){
        res.status(400).send("Not found")
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Internal error occured")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note})
})

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(401).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Internal error occured")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Deleted successfully!!!"})
})

module.exports = router