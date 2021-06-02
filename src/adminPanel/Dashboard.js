import React, {useEffect} from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import Header from './Header';
import Section from './Section';
import './dashboard.css';
import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Camera from '../images/camera.svg';
import Settings from '../images/settings.svg';
import Listicon from '../images/list.svg';
import Fileadd from '../images/file-plus.svg';
import Sectionqr from './Sectionqr';
import Sectiontable from './Sectiontable';
import Back from '../images/arrow-left-circle.svg'
import Sectionmanager from './Sectionmanager';
import { useLocation } from 'react-router';
function Dashboard() {
const [section, setSection] = React.useState(0)
const location = useLocation()
useEffect(()=>{

    if(localStorage.getItem("first") === "false") {
    setSection(1)
  }
  localStorage.setItem("first", true)
}, [location])


return (
        <div className="container">
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
                {/* <div
                        onClick={()=>{setSection(0)}}
                    >
                        <img className="backArrow" src={Back}></img>
                      
                    </div> */}
                    <div className="somediv"
                        onClick={()=>{setSection(0)}}
                    >
                        <img className="bingo" src={Fileadd}></img>
                        <div className="textIcon">Add Book</div>
                    </div>
                    <div
                    className="somediv"
                    onClick={()=>{setSection(1)}}
                    >
                        <img className="bingo" src={Camera}></img>
                        <div className="textIcon">Get QR Code</div>
                    </div>
                    <div
                    className="somediv"
                    onClick={()=>{setSection(2)}}
                    >
                    <img className="bingo" src={Listicon}></img>
                        <div className="textIcon">Contents</div>
                    </div>
                    <div
                    className="somediv"
                    onClick={()=>{setSection(3)}}
                    >
                    <img className="bingo" src={Settings}></img>
                        <div className="textIcon">Manager</div>
                    </div>
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
            <div className="mid">
                <Header/>{section===0?
                <Section/> : 
                section === 1?
                 <Sectionqr  /> : 
                 section === 2? 
                 <Sectiontable />  :
                  section === 3? 
                  <Sectionmanager /> 
                  : " "

            }
                </div>
        </div>
    )
}

export default Dashboard