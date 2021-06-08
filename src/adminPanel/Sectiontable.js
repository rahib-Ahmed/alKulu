import React, {useEffect, useState} from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from './Customtoolbar'
import {makeStyles} from '@material-ui/core/styles';
import Adminmodal from './Modal';
import QR from '../images/qr-code.svg'

function Sectiontable() {

    const [responsive, setResponsive] = React.useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = React.useState("450px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const [databig, setDatabig] = React.useState([])
    const [dataimg,setDataimg] = React.useState()
    const [iD,setID] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [openback, setOpenback] = React.useState(false)
    useEffect(async ()=>{
    
        const obj = "get"
        var result = await req.fetchAdmins(obj, 4)
        setDatabig(result)

    }, [])
  
    async function showQR(tableData) {
      setOpenback(true)
      setID(tableData.rowData[0])
        var result = await req.fetchAdmins(tableData.rowData[0], 3) 
        if(result){
          setOpenback(false)
          setOpen(true)
        setDataimg(result.qr)
}
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
              <img src={QR}onClick={() => {showQR(tableMeta)}}>
              </img>
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
    <Adminmodal data={{type: 2, states: open, stated: openback, bkid: iD, image: dataimg}} />
    </>
)
}

export default Sectiontable;