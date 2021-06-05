import React, {useEffect} from 'react';
import '../login/login.css';
import * as req from '../backend/adminBackend'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
function Adminlogin() {

    const [email,
        setEmail] = React.useState('')
    const [password,
        setPassword] = React.useState('')
    const [error,
        setError] = React.useState('')
    const history = useHistory()

    

    useEffect(async() => {
        
        let accessToken = Cookies.get("access");
        let refreshToken = Cookies.get("refresh");

        //  console.log(accessToken)

        if (refreshToken === undefined) {}
        if(accessToken != undefined) {
            var res = await req.fetchAdmins(accessToken, 6) //auth verify accesstoken! -> dashboard -> refresh! 
                if(res.status === "Unauthorized") 
                {  
                    if(refreshToken != undefined){
                            var result = await req.fetchAdmins(refreshToken, 7)
                            Cookies.set("access", result.token)
                            history.push("/Dashboard")
                        }
                         else {
                            return null
                        }
                  
                } else {
                    if(res.status === "isAdmin") {
                        history.push("/Dashboard")
                    } else if(res.status === "notAdmin"){
                                history.push("/IndexBook")        
                    }
                }

        } else {
                return null
        }
    }, [])
    const handleChangeEmail = (event) =>{
        setEmail(event.target.value)
    }

    const handleChangePass = (event) =>{
        setPassword(event.target.value)
    }
 
    async function submit() {
       
        const obj = {
            email: email,
            password: password
        }
        
        var result = await req.fetchAdmins(obj, 0)
        // console.log(result)
        if (result.status === "User not exist") {
        
            setError("This user does not exist")
        } else if (result.status === "Wrong email or password") {
            
            setError("Wrong email or Password")
        } else if(result.status === "login") {
            
            Cookies.set("refresh", result.res.refresh)
            Cookies.set("access", result.res.access)
            if(Cookies.get("access" === undefined)) {
            localStorage.setItem("name", result.res.name)
            var result = await req.fetchAdmins(result.res.access, 6)
            if(result.status === "isAdmin") {
                history.push("/Dashboard")
            } else if(result.status === "notAdmin") {
                history.push("/IndexBook")
            }
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
                    <input
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        className="inputField"/>
                    <input
                        type="password"
                        value={password}
                        onChange={handleChangePass}
                        className="inputField"
                        placeholder="Password"/>
                </div>
                <div className="minuteFlex">
                    <button onClick={() => {submit()}} className="button">Login</button>
                    <div className="error">{error}</div>
                </div>
                <div className="reservedFlex">
                    <text className="reserved textColor">All Right Reserved 2021</text>
                </div>
            </div>
        </div>
    )
}

export default Adminlogin