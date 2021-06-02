import React from 'react';
import './login.css';
import { useHistory,useLocation } from "react-router-dom";
import * as req from '../backend/adminBackend'

function Signup() {
    const history = useHistory()
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    var [mailerr,setMailerr]=React.useState('')
    var [namerr,setNamerr]=React.useState('')
    var [passerr,setPasserr]=React.useState('')
    function validator() {
        var mail= "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
        var pass="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
        !email.match(mail)? setMailerr('Please enter a valid mail!') : setMailerr('');
        name ===''? setNamerr('Please enter a UserName!') : setNamerr('');
        !password.match(pass)? setPasserr('Password should contain special characters, capital letters and numbers!') : setPasserr('');
      }
  
    async function submitDetails() {
       if(mailerr === '' || passerr === '' || namerr === ''){

        const obj = {
            email: email,
            password: password,
            name: name
        }
        var result = await req.fetchAdmins(obj, 1) 
        // console.log(result)
        if(result.status === "Added Successfully") {
            setError("User Added Successfully")
            history.push("/LoginAdmin")
        }
        else {
            setError("User Already Exist")
        }
        }
    }
    return (
        <div className="i-phone-12">
            <div className="master">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
                        <path
                            d="M 42 13 C 42 10.791 43.791 9 46 9 L 78 9 C 80.209 9 82 10.791 82 13 L 82 44 L 113 44 C 115.209 44 117 45.791 117 48 L 117 80 C 117 82.209 115.209 84 113 84 L 82 84 L 82 115 C 82 117.209 80.209 119 78 119 L 46 119 C 43.791 119 42 117.209 42 115 L 42 84 L 11 84 C 8.791 84 7 82.209 7 80 L 7 48 C 7 45.791 8.791 44 11 44 L 42 44 Z"
                            fill="#4B7974"></path>
                    </svg>
                </div>
                <div className="minorFlex">
                    <input value={email} onBlur={()=>validator()} required onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="inputField"/>
                    <div className="error">{mailerr}</div>
                    <input  value={name} onBlur={()=>validator()} required onChange={(e)=>{setName(e.target.value)}} className="inputField" placeholder="Username"/>
                    <div className="error">{namerr}</div>
                    <input  type="password" value={password} onBlur={()=>validator()} required onChange={(e)=>{setPassword(e.target.value)}} className="inputField" placeholder="Password"/>
                    <div className="error">{passerr}</div>
                </div>
                <div className="minuteFlex">
                
                    <button  value="Signup" className="button" onClick={()=>submitDetails()}>Signup</button>
                    <text className="textColor admin">Click here for Administrative <u onClick={()=>{history.push("/Login")}}>Login</u></text>
                    <div className="error">{error}</div>
                </div>
                <div className="reservedFlex">
                    <text className="reserved textColor">All Right Reserved 2021</text>
                </div>
            </div>
        </div>
    )
}

export default Signup