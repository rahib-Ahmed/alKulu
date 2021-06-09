import React from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Check from '../images/check.svg';
import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Back from '../images/arrow-left.svg';
import Print from '../images/printer.svg';
import Download from '../images/download.svg';
import * as req from '../backend/adminBackend';
import Cross from '../images/x.svg'
import {fetchAdmins} from '../backend/adminBackend'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Plus from '../images/plus-circle.svg';
import Select from '@material-ui/core/Select';
import {Button} from '@material-ui/core';

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

export default function Adminmodal(props) {

const history = useHistory()
const classes = useStyles()
    

function Sectionmodal() {
    var [open, setOpen] = React.useState(props.data.states)
    var [openback, setOpenback] = React.useState(props.data.stated)
    var bkid = props.data.bkid
    const handleClose = () => {
        setOpen(false)
        window.location.replace("/Dashboard")
      };
        const handleCloseBack = () =>{
            setOpenback(false)
        }
        function directToQR() {
          
            localStorage.setItem("first", false)
            history.push({pathname: "/Dashboard", state: {type: 1, bkid}})
        }
        return (
            <>
            <Modal
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
          <Backdrop className={classes.backdropss} open={openback} onClick={handleCloseBack}> 
          <CircularProgress color="inherit" />
          </Backdrop>
          </>
        )
    }
function Tablemodal() {
    var [open, setOpen] = React.useState(props.data.states)
    var [openbacks, setOpenbacks] = React.useState(props.data.stated)
    var iD = props.data.bkid;
    var dataimg = props.data.image;
    const handleCloseBack = () =>{
        
        setOpenbacks(false)
    }
      const handleClose = () => {

        setOpen(false)
        
      };
      function print(){
        const printBtn = document.getElementById('print')
        const iframe = document.createElement('iframe');
            printBtn.addEventListener('click', function() {
                
                
    // Make it hidden
    iframe.style.height = 0;
    iframe.style.visibility = 'hidden';
    iframe.style.width = 0;
    
    // Set the iframe's source
    iframe.setAttribute('srcdoc', '<html><body></body></html>');
    
    document.body.appendChild(iframe);
            });
    
    iframe.addEventListener('load', function() {
                // Clone the image
                const image = document.getElementById('image').cloneNode();
                image.style.maxWidth = '100%';
            
                // Append the image to the iframe's body
                const body = iframe.contentDocument.body;
                body.style.textAlign = 'center';
                body.appendChild(image);
                image.addEventListener('load', function() {
                    // Invoke the print when the image is ready
                    iframe.contentWindow.print();
                });
            })
        }
    return (
        <>
        <Modal
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
          <div className="paper1">
              <div className="headerModalQR">
                <div>
                <img onClick={handleClose} src={Back} /></div>
                <div className="headerModalQR2">
                <a href={dataimg} download><img src={Download} /></a>
                <img id="print" onClick={()=>{print()}} src={Print}/>
                </div>
            </div>
                <div className="scannedQR">
                 <img id="image" className="imgQR" src={dataimg}/> 
                  <div style={{fontSize: '26px'}} className="modalText">Book ID : {iD}</div>
                </div>
          </div>
        </Fade>
      </Modal>
      <Backdrop className={classes.backdropss} open={openbacks} onClick={handleCloseBack}> 
      <CircularProgress color="inherit" />
      </Backdrop>
        </>
    )
}
function Scannedmodal() {
  var [open, setOpen] = React.useState(props.data.states)
  var [openbacks, setOpenbacks] = React.useState(props.data.stated)
  const [err, setErr] = React.useState('')
  var data = props.data.qrdata;

  const handleCloseBack = () =>{
    setOpenbacks(false)
}
  const handleClose = () => {
    setOpen(false)
  };

  async function submit() {
    setOpenbacks(true)
    var obj = {
      admin: true,
      issueid: data.bookid
    }
    var result = await fetchAdmins(obj, 10)
    if(result.status === "received") {
      setOpenbacks(false)
      setOpen(false)
    } else if(result.status === "The book is available") {
      setErr("You are trying to scan an already returned book")
    }
  }
 
  return (
    <>
    <Modal
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
      <div className="paper2">
          <div className="returnModalQR">
            <div>
            <img onClick={handleClose} src={Back} /></div>
            <div><img onClick={()=>{handleClose()}} src={Cross}></img></div>
        </div>
            <div className="returnBook">
              <p className="headingreturn">Do you want to return the book?</p>
              <div className="text1">Title: {data.title}</div>
              <div className="text1">Author: {data.author}</div>
              <div className="text1">{err}</div>
            </div>
            <div className="footerScanned">
              <input className="scannedButton" onClick={()=>{submit()}} type="button"  value="Accept" />
              <input className="scannedButton" onClick={handleClose} type="button" value="Cancel"/>
            </div>
      </div>
    </Fade>
  </Modal>
  <Backdrop className={classes.backdropss} open={openbacks} onClick={handleCloseBack}> 
  <CircularProgress color="inherit" />
  </Backdrop>
    </>
)
}
function Editmodal() {
  var [open, setOpen] = React.useState(props.data.states)
  var [openbacks, setOpenbacks] = React.useState(props.data.stated)
  const [err, setErr] = React.useState('')
  const [cat,setCat] = React.useState(["None","Hadees","Seerat","Treekh","Sawaneh","Fiqah", "Tasawwuf", "Bayanat wa khitabat", "Radd firqa w batila"]);
  const [input,
    setInput] = React.useState({})
    const [filenu,
      setFilenu] = React.useState()
    const [newcat, setNewcat] = React.useState('')
    const [caterror, setCaterror] = React.useState('')
    const [length, setLength] = React.useState()
    var imageData = []
    var data = props.data.qrdata;
  var ed1 = req.add1()
  var plac1 = req.plac1()
  const handleChange = (event) => {
    setInput({
        ...input,
        [event.target.name]: event.target.value
    })
 
}
// console.log(input)
  var data = []
  for(var i=0;i<5;i++) {
    var temp = {
      i: i,
      ed1: ed1[i],
      plac1: plac1[i]
    }
    data.push(temp)
  }
var data2 = []
for(var i=5;i<8;i++) {
  var temp = {
    i: i,
    ed1: ed1[i],
    plac1: plac1[i]
  }
  data2.push(temp)
}
  const handleCloseBack = () =>{
    setOpenbacks(false)
}
  const handleClose = () => {
    setOpen(false)
  };
  var pushCatchange = (event) => {
        
    setNewcat(event.target.value)
}
function validator(event) {
  event.target.value === '' ? setCaterror("Empty Category") : setCaterror('')
}
const handleFile = (event) => {

  for (var i = 0; i < event.target.files.length; i++) {
      imageData.push(event.target.files[i])
  }
  setFilenu(imageData)
  setLength(event.nativeEvent.target.files.length)
}

function pushCat() {
  if(newcat === '') {
      alert("Empty category")
  } else {
  cat.push(newcat)
  setNewcat('')
}
}

async function submitedit() {
  
  setOpenbacks(true)

  const obj = {
    file: filenu,
    data: input,
    type: "update",
    deleteid: props.data.bkid
  }
  var result = await fetchAdmins(obj, 5)
if(result) {
  setOpenbacks(false)
  setOpen(false)
  window.location.replace("/Dashboard")
}
}
 
  return (
    <>
    <Modal
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
      <div className="paper4">
          <div className="returnModalQR">
            <div>
            <img onClick={handleClose} src={Back} /></div>
            <div style={{fontSize: '2vw'}} className="text1">Edit</div>
            <div><img onClick={()=>{handleClose()}} src={Cross}></img></div>
        </div>
            <div className="returnEdit">
              <div className="edit1">
                {data.map((items) =>{
                  return (
                    <>
                   <div>
                   <div className="editText">{items.ed1}</div>
                   <input className="inputEdit" onChange={handleChange} placeholder={items.plac1} type="text" name={items.ed1} />
                 </div>
                 </>
                 )
                })}
               
              </div>
              <div className="edit1">
              {data2.map((items) =>{
                  return (
                    <>
                   <div>
                   <div className="editText">{items.ed1}</div>
                   <input className="inputEdit" onChange={handleChange} placeholder={items.plac1} type="text" name={items.ed1} />
                 </div>
                 </>
                 )
                })}
                <div>
                <div className="editText">Category</div>
                            <FormControl className="formControl" variant="outlined" >
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="Categories"
                                    onChange={handleChange}
                                   >
                                    {cat.map((item)=>{
                                        
                                        return (
                                            <MenuItem  value={item}>{item}</MenuItem>
                                        )
                                    })}  
                                </Select>
                            </FormControl>
                            <div>
                            <input value={newcat} onBlur={(e)=>{validator(e)}} className="inputEdit"  type="text" name="CategAdd" onChange={pushCatchange} />
                            
                            <img onClick={()=>{pushCat()}} style={{marginLeft: '20px'}} src={Plus}></img>  
                            </div>
                        </div>
                   
                        <div className="imageEdit">
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
              
            </div>
            <div className="footerScanned">
              <input onClick={()=>{submitedit()}} className="scannedButton" type="button"  value="Save Changes" />
            </div>
      </div>
    </Fade>
  </Modal>
  <Backdrop className={classes.backdropss} open={openbacks} onClick={handleCloseBack}> 
  <CircularProgress color="inherit" />
  </Backdrop>
    </>
  )
}
    return (
        <>{props.data.type === 1? 
        <Sectionmodal />  : 
        props.data.type === 2? 
        <Tablemodal /> :
        props.data.type === 3? 
        <Scannedmodal /> : 
        props.data.type === 4 && props.data.edit === "edit"?
        <Editmodal /> : ""
        }
        </>
    )
}