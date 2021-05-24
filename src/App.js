import React, { useLayoutEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import anime from 'animejs/lib/anime.es.js';
import styled from "styled-components";
function App() {
  const [animes, setAnimes] = React.useState(false)
  // document.querySelector('.App-header')
  //   .addEventListener('scroll', handleScroll);
  // useEffect(()=>{
    const animations = anime({
       targets: '',
       scale: 2,
       height: '20px',
       width: '30px',
       duration: 1200,
       easing : 'easeInOutSine'
    })
    const [filess, setFiless] = React.useState(null) 
     
    var onFileChange = (event) =>{ 
      console.log(event.target)
      setFiless(event.target.files[0]); 
    }; 
     
    // On file upload (click the upload button) 
   var onFileUpload = () => { 
     let param = new FormData()
     param.append("imageData", filess)
     param.append("imageName", "cover-" + Date.now())
     param.append("bookid", "2")
     param.append("title", "seeratSSS")
     param.append("author", "som1SS")
     param.append("coAuthor", "som2SS")
     param.append("categories", "mulSS")
     param.append("pages", "245SS")
     param.append("publisher", "som3SS")
     param.append("keywords", "wq qw qw")
     param.append("language", "urd")
     param.append("volume", "1")
    param.forEach((value, key) => {
      console.log(value)
    })
     console.log(param)
     var req = {

       method: 'POST',
        
       body: param
     }
     console.log(req)
     fetch("http://localhost:3001/book/uploadmulter", req)
     .then((x)=>{
       console.log(x)
      console.log("success")
     })
    console.log(filess)
    }; 

  return (
    <div className="App">
      <div className="App-header">
      {/* <div  className="box">hello</div>
      <div className="box">hello</div>
      <div className="box">hello</div>
      <div className="box">hello</div>
      <div className="box">hello</div> */}
  
      <input type="file"  onChange={onFileChange} /> 
                <button onClick={onFileUpload}> 
                  Upload! 
                </button> 
               
      </div>
    </div>
  );
}

export default App;
