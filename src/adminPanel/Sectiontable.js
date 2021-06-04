import React, {useEffect, useState} from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from './Customtoolbar'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Back from '../images/arrow-left.svg';
import Print from '../images/printer.svg';
import Download from '../images/download.svg';
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
function Sectiontable() {

    const [responsive, setResponsive] = React.useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = React.useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const [databig, setDatabig] = React.useState([])
    const [dataimg,setDataimg] = React.useState()
    const [iD,setID] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [openback, setOpenback] = React.useState(false)
    const classes = useStyles()
    useEffect(async ()=>{
    
        const obj = "get"
        var result = await req.fetchAdmins(obj, 4)
        setDatabig(result)

    }, [])
    const handleCloseBack = () =>{
      setOpenback(false)
  }
    const handleClose = () => {
      setOpen(false);
      
    };
    async function showQR(tableData) {
      setOpenback(true)
      console.log(tableData)
      setID(tableData.rowData[0])
      
        const obj = {
            id: iD
        }
        var result = await req.fetchAdmins(obj, 3) 
        if(result){
          setOpenback(false)
          setOpen(true)
        setDataimg(result.qr)
}
    }
    
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
    const columns = [
    "Bookid", 
    "Title", 
    "Author", 
    "Co-Author", 
    "Language", 
    "Publisher", 
    "Pages", 
    "Volume", 
    "Category", 
    "keywords",
     {
        name: "Get QR",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (dataIndex, tableMeta) => {

            return (
              <button className="getQRtable" onClick={  () =>  {showQR(tableMeta)}}>
                Get QR
              </button>
            );
          }
        }
      },
  
  ];

    
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        customToolbarSelect: (selectedRows, tableMeta) => <CustomToolbarSelect selectedRows={{table: tableMeta, select: selectedRows}} />
      };

  
      var data = []
   
      for(var i = 0; i<databig.length; i++) {
        data.push([
          databig[i].bookid,
          databig[i].title,
          databig[i].author,
          databig[i].coAuthor,
          databig[i].language,
          databig[i].publisher,
          databig[i].pages,
          databig[i].volume,
          databig[i].categories,
          databig[i].keywords
        ])
          
        }

    return (
    <>
     <div className="section"> 
     <div className="secHeader">
                <div className="upload-books">
                  Contents
                </div>
                
            </div>      
       <div className="midsec3">
      <MUIDataTable
         title={"Contents"}
        data={data}
        columns={columns}
        options={options}  
      />
      </div>
    </div>
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
                <img src={Back} /></div>
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
      <Backdrop className={classes.backdropss} open={openback} onClick={handleCloseBack}> 
      <CircularProgress color="inherit" />
      </Backdrop>
    </>
)
}

export default Sectiontable;