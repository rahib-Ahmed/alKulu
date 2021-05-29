import React from 'react'
import './dashboard.css';
import {
    IconButton,
    Toolbar,
    Typography,
 
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Bell from  '../images/bell.svg'
import Logout from '../images/log-out.svg'

const useStyles = makeStyles({

    
});
const useDrawer = makeStyles({
    drawer: {
        width: '240',
        flexShrink: 0,
        whiteSpace: 'nowrap'
    }
})

function Header() {
    const classes = useStyles()
    const drawer = useDrawer()
return (
<>
<div className="header">
<Toolbar>
    <div className="textColor">Good Evenning Oreo</div>
</Toolbar>

<Toolbar className={classes.endIcon}>
    <IconButton
      >
        <img className="imgHead" src={Bell}></img>
    </IconButton>
    <IconButton
      >
        <img className="imgHead" src={Logout}></img>
    </IconButton>
</Toolbar>
</div>
</>
)
}

export default Header;