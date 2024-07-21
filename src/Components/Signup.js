import React, {useState, useEffect} from 'react'
import '../Styles/Signup.css'
import {useNavigate, Link} from 'react-router-dom'

function Signup() {
    const [credentials, setCredentials] = useState({'name':'', 'email':'', 'password':'', 'cpassword':''})
    const [color, setColor] = useState('black')
    const [match, setMatch] = useState(true)
    const [exist, setExist] = useState(false)
    const {name, email, password, cpassword} = credentials
    const navigate = useNavigate();

    const onSubmit =async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method:'POST',
            statusCode: 200,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body : JSON.stringify({name:credentials.name,email: credentials.email,password: credentials.password})
        })
        const json = await response.json()
        if(json.error !== undefined){
            console.log(json)
            setExist(true)
            e.preventDefault()
        }
        else{
            setExist(false)
            localStorage.setItem('token', json.authtoken)
            navigate('/signin')
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
        if (e.target.name==='password'){
            if (e.target.value.length<9){
                setColor('red')
            }
            else{
                setColor('black')
            }
        }
        // Check for confirmed password
        if(e.target.name === 'cpassword'){
            if(e.target.value === credentials.password.toString()){
                setMatch(true)
            }
            else{setMatch(false)}
        }
    }
  return (
    <div className = "box">
        <form onSubmit = {onSubmit}>
        <h1>SignUp</h1>
            <input type="text" placeholder = "Name" class="first-child inputs" name = "name" onChange = {onChange} value={credentials.name} />
            <input type="email" name="email" class="inputs" placeholder = "Email" onChange = {onChange} value={credentials.email} style={{'border':`1px solid ${exist?'red':'black'}`}} />
            <label htmlFor="cpassword" style={{'display':`${exist?'block':'none'}`, 'color':'red'}}>Email exists by another user</label>
            <input type="password" name="password" class="inputs" placeholder="Password" onChange = {onChange} value={credentials.password} style={{'border':`1px solid ${color}`}} />
            <label htmlFor="password" style={{'display':`${color==='red'?'block':'none'}`, 'fontSize':'13px', 'color':'red'}}><br/>Password must not less than 9 characters</label>
            <input type="password" name="cpassword" class="inputs" placeholder="Confirm password" onChange = {onChange} value={credentials.cpassword} style={{'border':`1px solid ${match?'black':'red'}`}} />
            <label htmlFor="cpassword" style={{'display':`${match?'none':'block'}`, 'color':'red'}}>Password does not match</label>
            <button type="submit">Submit</button>
            <Link to='/signin' style={{'color':'black', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto', 'marginTop':'10px'}}>Already have an account</Link>
        </form>
    </div>
  )
}

export default Signup
