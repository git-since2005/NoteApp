const express = require('express')
const User = require('../models/User')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "SecureNotesEncryptItAtAnyC$st"

router.post('/createuser', [
    body('name', "Enter a valid name").isLength({'min':2}),
    body('email, "Enter a valid email"').isEmpty(),
    body('password', "Password must be atleast 8 characters").isLength({'min':8})
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            'name': req.body.name,
            "email":req.body.email,
            "password":secPass
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken)

        res.json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");
    }

})

router.post('/login', [
    body('email, "Enter a valid email"').isEmpty()
], async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(req.body.password)
        return res.status(400).send({errors:errors.array()})
    }

    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
            const passCompare = await bcrypt.compare(req.body.password, user.password)
            if (!passCompare){
                return res.status(404).send("Password not matched.")
            }
            else{
                const data = {
                    user:{
                        id:user.id
                    }
                }
                const authtoken = jwt.sign(data, JWT_SECRET)
                console.log(authtoken)
                return res.json({"authtoken":authtoken})
            }
        }
        else{
            return res.status(400).send("Please enter correct credentials.")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

router.post('/getuser', fetchuser, async (req, res)=>{
    try{
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router