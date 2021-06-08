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
import Scanner from './Scanner'
function Dashboard() {
const [section, setSection] = React.useState(0)
const location = useLocation()

useEffect(()=>{

    if(localStorage.getItem("first") === "false") {
    setSection(1)
  } else if(localStorage.getItem("second") === "true") {
      setSection(2)
  }
  localStorage.setItem("first", true)
  localStorage.setItem("second", false)
}, [location])
var images = req.images()
var title = req.title()
var data = []

for(var i=0; i<5; i++){
    var temp={
        i: i,
        images: images[i],
        title: title[i],
    }
data.push(temp)
}


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
               {data.map((items)=>{
                   return (
                   <div className="somediv"
                   onClick={()=>{setSection(items.i)}}
               >
                   <img className="bingo" src={items.images}></img>
                   <div className="textIcon">{items.title}</div>
               </div>)
               })}
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
                  <Sectionmanager /> : 
                  section === 4? 
                  <Scanner /> :
                  ""

            }
                </div>
        </div>
    )
}

export default Dashboard