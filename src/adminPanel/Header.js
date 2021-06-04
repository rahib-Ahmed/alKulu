import React, { useEffect } from 'react'
import './dashboard.css';
import {
    IconButton,
    Toolbar,
 
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Logout from '../images/log-out.svg'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

const useStyles = makeStyles({

    
});


function Header() {
    
const [respect, setRespect] = React.useState("")
const history = useHistory()
useEffect(()=>{
        
        const date = new Date()
        // console.log(date.getHours())
        if(date.getHours() >= 6 && date.getHours() < 12) 
        {
            setRespect("Good Morning ")
        } else if(date.getHours() >= 12 && date.getHours() < 18) 
        {
            setRespect("Good Afternoon ")
        }  else if(date.getHours() >= 18 && date.getHours() <= 24) 
        {
            setRespect("Good Evening ")
        }
    
}, [])

var name = localStorage.getItem("name")
function logout() {
    Cookies.set("access", '')
    Cookies.set("refresh", '')
    history.push("/")
}
    const classes = useStyles()
  
return (
<>
<div className="header">
    <div className="TTX" >

    </div>
<Toolbar>
    <div className="textColor">{respect} {name}</div>
    <div className="phnHead">Dashboard</div>
</Toolbar>
    <IconButton
      >
        <img onClick={()=>{logout()}} className="imgHead" src={Logout}></img>
    </IconButton>
 
</div>
<div className="borderHeader">

</div>
</>
)
}

export default Header;