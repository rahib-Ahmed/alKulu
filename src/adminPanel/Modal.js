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
import { fetchAdmins } from '../backend/adminBackend';
import Cross from '../images/x.svg'
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

    return (
        <>{props.data.type === 1? 
        <Sectionmodal />  : 
        props.data.type === 2? 
        <Tablemodal /> :
        props.data.type === 3? 
        <Scannedmodal /> : ""
        }
        </>
    )
}