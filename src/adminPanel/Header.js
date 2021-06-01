import React, { useEffect } from 'react'
import './dashboard.css';
import {
    IconButton,
    Toolbar,
    Typography,
 
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Bell from  '../images/bell.svg'
import Logout from '../images/log-out.svg'
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles({

    
});


function Header() {
const [respect, setRespect] = React.useState("")
useEffect(()=>{
    
        const date = new Date()
        console.log(date.getHours())
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
    

    const classes = useStyles()
  
return (
<>
<div className="header">
    <div className="TTX" >

    </div>
<Toolbar>
    <div className="textColor">{respect}Oreo</div>
    <div className="phnHead">Dashboard</div>
</Toolbar>
    <IconButton
      >
        <img className="imgHead" src={Logout}></img>
    </IconButton>
 
</div>
<div className="borderHeader">

</div>
</>
)
}

export default Header;