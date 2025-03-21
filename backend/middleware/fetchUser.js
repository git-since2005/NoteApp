const jwt = require('jsonwebtoken')
const JWT_SECRET = "SecureNotesEncryptItAtAnyC$st"

const fetchuser = async(req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = await req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please give a token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    }
    catch(error){
        res.status(401).send({error: "Please authenticate using a valid token."})
    }
}

module.exports = fetchuser;