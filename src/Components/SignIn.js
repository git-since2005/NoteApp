import React, {useState, useContext} from 'react'
import '../Styles/SignIn.css'
import {useNavigate, Link} from 'react-router-dom'
import allContext from '../Contexts/Context'

function SignIn(props) {
    const {setToken} = useContext(allContext)
    const [credentials, setCredentials] = useState({'email':'', 'password':''})
    const [exists, setExists] = useState(true)
    const [ correct, setCorrect] = useState(true)
    const navigate = useNavigate();
    const onSubmit =async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method:'POST',
            statusCode: 200,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body : JSON.stringify({email: credentials.email, password: credentials.password})
        }).then(async (e)=>{
            const json = await e.json()
            if(json.error !== undefined){
                e.preventDefault()
                console.log(json)
                if(json.error.toString()==='Password'){
                    setCorrect(false)
                }
                else if(json.error.toString()==='Email'){
                    setExists(false)
                }
            }
            else{
                setExists(false)
                localStorage.setItem('token', json.authtoken)
                navigate('/notes')
            }
        })
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:[e.target.value]})
    }
  return (
    <div className = "container">
        <form onSubmit = {onSubmit}>
        <h1>SignIn</h1>
            <input type="email" class='first-child inputs' name="email" placeholder = "Email" onChange = {onChange} value={credentials.email} style={{'border':`1px solid ${exists?'black':'red'}`}} />
            <label htmlFor="email" style={{'display':exists?'none':'block', 'color':'red'}}>Email does not exists</label>
            <input type="password" class="inputs" name="password" placeholder="Password"onChange = {onChange} value={credentials.password} style={{ 'border':`1px solid ${correct?'black':'red'}`}} />
            <label htmlFor="password" style = {{'display':correct?'none':'block', 'color':'red'}}>Password is incorrect</label>
            <button type="submit">Submit</button>
            <Link to='/' style={{'color':'black', 'textDecoration':'none', 'marginLeft':'auto', 'marginRight':'auto'}}>Sorry I don't have it</Link>
        </form>
    </div>
  )
}

export default SignIn