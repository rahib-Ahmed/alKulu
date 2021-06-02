import React from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Check from '../images/check.svg';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
    formControl: {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '20vw'
    }
});

function Section() {

    const [input,
        setInput] = React.useState({})
    const [filenu,
        setFilenu] = React.useState()
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [bkid, setBkid] = React.useState()    
    const [length, setLength] = React.useState()
    const [error, setError] = React.useState('')
        const history = useHistory()
  const handleClose = () => {
    setOpen(false);
    window.location.replace("/Dashboard")
  };

    var imageData = []
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }
    function validator(event) {
        if(event.target.value === '') {
            setError("Empty Fields")
        } else setError('Completed')
    }
    
    const handleFile = (event) => {

        for (var i = 0; i < event.target.files.length; i++) {
            imageData.push(event.target.files[i])
        }
        setFilenu(imageData)
        setLength(event.nativeEvent.target.files.length)
    }

    async function submit() {
        if(error==='Completed'){
        var bookid = Math.floor(Math.random() * 1000) + 1
        setBkid(bookid)
        // console.log(input)
        const obj = {
            data: input,
            file: filenu,
            bookid: bookid
        }
        var result = "Book added Successfully"
        // var result = await req.fetchAdmins(obj, 2)
        // console.log(result)
        if(result === "Book added Successfully") {
            setInput()
            setOpen(true)
            localStorage.setItem("currentID", bookid)
        }
} else {
    alert("Empty Fields or No image selected")
}
    }
    function directToQR() {
        console.log("hjere")
        localStorage.setItem("first", false)
        history.push({pathname: "/Dashboard", state: {type: 1, bkid}})
    }
    return (
        <>
        <div className="section">
            <div className="secHeader">
                <div className="upload-books">
                    Upload Books
                </div>
                
                <div>
                    <input
                        onClick={() => submit()}
                        className="addBook"
                        type="button"
                        value="Add Book"/>
                </div>
            </div>
        
                <div className="midSec">
                    <div className="row x align-items-center">
                        <div className="inputText oneFlex">Title</div>
                        <div className="twoFlex">
                            <input 
                                onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="title"
                                placeholder="Book Title"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center">
                        
                        <div className="inputText oneFlex">Author</div>
                        <div className="threeFlex">
                            <input
                           onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="author"
                                placeholder="Book author"
                                className="inputBook alag"/>
                        </div>
                        
                        
                        <div               
                            className="inputText oneFlex">Co-Author</div>
                        <div className="threeFlex">
                            <input
                             onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="coAuthor"
                                placeholder="Book CoAuthor"
                                className="inputBook alag"/>
                        </div>
                        
                    </div>
                    <div className="row  x align-items-center">
                        <div className="inputText oneFlex">Publisher</div>
                        <div className="twoFlex">
                            <input
                            onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="Publisher"
                                placeholder="Publisher"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center">
                        <div className=" inputText oneFlex">Categories</div>
                        <div className="twoFlex">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Category</InputLabel>
                                <Select

                                    name="Categories"
                                    onChange={handleChange}>
                                    <MenuItem onBlur={(e)=>validator(e)} value={input}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Hadees"}>Hadees</MenuItem>
                                    <MenuItem value={"Seerat"}>Seerat</MenuItem>
                                    <MenuItem value={"Treekh"}>Treekh</MenuItem>
                                    <MenuItem value={"Sawaneh"}>Sawaneh</MenuItem>
                                    <MenuItem value={"Fiqah"}>Fiqah</MenuItem>
                                    <MenuItem value={"Tasawwuf"}>Tasawwuf</MenuItem>
                                    <MenuItem value={"Radd firqa w batila"}>Radd firqa w batila</MenuItem>
                                    <MenuItem value={"Bayanat wa khitabat"}>Bayanat wa khitabat</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="row x align-items-center">
                        <div className="inputText oneFlex">Languages</div>
                        <div className="twoFlex">
                            <input
                            onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="language"
                                placeholder="Language"
                                className="inputBook"/>
                        </div>
                    </div>

                    <div className="row  x align-items-center ">
                        <div className="inputText oneFlex">Pages</div>
                        <div className="threeFlex">
                            <input
                            onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="Pages"
                                placeholder="Book Pages"
                                className="inputBook alag"/>
                        </div>
                        <div
                        
                            className="inputText oneFlex">Volumes</div>
                        <div className="threeFlex">
                            <input
                            onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="Volumes"
                                placeholder="Book Volume"
                                className="inputBook alag"/>
                        </div>
                    </div>
                    <div className="row x align-items-center ">
                        <div className="inputText oneFlex">Keywords</div>
                        <div className="twoFlex">
                            <input
                            onBlur={(e)=>validator(e)}
                                onChange={handleChange}
                                name="keywords"
                                placeholder="Keywords"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center ">
                        <div className="inputText oneFlex">Image</div>
                        <div className="twoFlex">
                            <label>
                                <input
                                onBlur={(e)=>validator(e)}
                                    onChange={handleFile}
                                    type="file"
                                    style={{
                                    display: 'none'
                                }}
                                    multiple
                                    accept="image/*"/>
                                <Button
                                    style={{
                                    marginTop: '10px'
                                }}
                                    variant="outlined"
                                    component="span">
                                    Choose Files
                                </Button>
                            </label>
                            <div className="lengthFile inputText" style={{fontSize: '20px'}}>Total files selected: {length}</div>
                        </div>
                        
                    </div>
                    <div style={{color: '#757575'}} className="modalText">{error}</div>
                </div>
      
        </div>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
              
              <div>
              <div className="firstMod">
              <img style={{paddingTop: '15px', marginRight: '20px'}} src={Check}></img>
            <h2 className="modalText" id="transition-modal-title">Book added successfully!</h2>
            </div>
            <p className="modalID modalText ">Book Id: {bkid}</p>
            </div>
            <div className="bottomButton">
                <input className="modalButton1" onClick={()=>directToQR()} type="button"  value="Get QR Code"/>
                <input className="modalButton1" onClick={handleClose} type="button" value="Accept" />
            </div>
          </div>
        </Fade>
      </Modal>

        </>
    )
}

export default Section