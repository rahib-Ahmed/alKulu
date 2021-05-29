import React from 'react';
import './dashboard.css';
import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Camera from '../images/camera.svg';
import Settings from '../images/settings.svg';
import Listicon from '../images/list.svg';
import Fileadd from '../images/file-plus.svg';

function Navbar() {
    return (
        <>
<div className="drawer">
                <div className="dashHead">
                    <div className="text">
                        Dashboard
                    </div>

                    <div className="threeBar">
                        <MenuIcon
                            style={{
                            height: "60px",
                            width: '45px',
                            color: 'rgb(51, 75, 73)'
                        }}/>
                    </div>
                </div>
                <div className="iconTab">
                    <IconButton>
                        <img src={Fileadd}></img>
                        <div className="textIcon">Add Book</div>
                    </IconButton>
                    <IconButton>
                        <img src={Camera}></img>
                        <div className="textIcon">Get QR Code</div>
                    </IconButton>
                    <IconButton>
                    <img src={Listicon}></img>
                        <div className="textIcon">Contents</div>
                    </IconButton>
                    <IconButton>
                    <img src={Settings}></img>
                        <div className="textIcon">Manager</div>
                    </IconButton>
                </div>
                <div
                    style={{
                    fontSize: 15,
                    marginBottom: 20
                }}
                    className="footerB text">
                    All right reserved
                </div>
            </div>
        </>
    )
}

export default Navbar

