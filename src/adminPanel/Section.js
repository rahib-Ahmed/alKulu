import React from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useHistory } from "react-router-dom";
import Plus from '../images/plus-circle.svg'
import Adminmodal from './Modal';
const useStyles = makeStyles((theme)=>({
    formControl: {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '20vw'
    },
     backdropss: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        },

}));

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
    const [openback, setOpenback] = React.useState(false)
    const history = useHistory()
    const [newcat, setNewcat] = React.useState('')
    const [cat,setCat] = React.useState(["None","Hadees","Seerat","Treekh","Sawaneh","Fiqah", "Tasawwuf", "Bayanat wa khitabat", "Radd firqa w batila"]);
    const [caterror, setCaterror] = React.useState('')
 
    var imageData = []
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
     
    }
    
  
    const handleFile = (event) => {

        for (var i = 0; i < event.target.files.length; i++) {
            imageData.push(event.target.files[i])
        }
        setFilenu(imageData)
        setLength(event.nativeEvent.target.files.length)
    }
    var pushCatchange = (event) => {
        
        setNewcat(event.target.value)
    }

    async function submit() {
        
            if(input.Pages === "" || input.Publisher === "" || input.Volumes === "" || input.author === ""
            || input.language === "" || input.keywords === "" || input.coAuthor === "" || filenu === undefined) {
                alert("Input Fields Empty")
                setError("Input Fields Empty")
            }        
       
        else {
            
            setOpenback(true)
            setError("")
        var bookid = Math.floor(Math.random() * 1000) + 1
        setBkid(bookid)
        // console.log(input)
        const obj = {
            data: input,
            file: filenu,
            bookid: bookid
        }
        // var result = "Book added Successfully"
        var result = await req.fetchAdmins(obj, 2)
        // console.log(result)
        if(result.status === "Book added Successfully") {
            setOpenback(false)
            setOpen(true)
            localStorage.setItem("currentID", bookid)
        }
} 

    }
    function validator(event) {
        event.target.value === '' ? setCaterror("Empty Category") : setCaterror('')
    }
    function pushCat() {
        if(newcat === '') {
            alert("Empty category")
        } else {
        cat.push(newcat)
        setNewcat('')
    }
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
                          
                                onChange={handleChange}
                                name="author"
                                placeholder="Book author"
                                className="inputBook alag"/>
                        </div>
                        
                        
                        <div               
                            className="inputText oneFlex">Co-Author</div>
                        <div className="threeFlex">
                            <input
                             
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
                                    {cat.map((item)=>{
                                        
                                        return (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    })}  
                                </Select>
                            </FormControl>
                            <input value={newcat} onBlur={(e)=>{validator(e)}} className="inputBook" style={{marginLeft: '20px'}} type="text" name="CategAdd" onChange={pushCatchange} />
                            
                            <img onClick={()=>{pushCat()}} style={{marginLeft: '20px', marginTop: '10px'}} src={Plus}></img>  
                        </div>
                    </div>
                    
                    <div className="row x align-items-center">
                        <div className="inputText oneFlex">Languages</div>
                        <div className="twoFlex">
                            <input
                            
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
                            type="number"
                            
                                onChange={handleChange}
                                name="Pages"
                                placeholder="Book Pages"
                                className="inputBook alag"/>
                        </div>
                        <div
                        
                            className="inputText oneFlex">Volumes</div>
                        <div className="threeFlex">
                            <input
                                type="number"
                                
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
        <Adminmodal data={{type: 1, states: open, stated: openback, bkid: bkid}}/>
        </>
    )
}

export default Section