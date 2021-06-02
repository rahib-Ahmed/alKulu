import React, {useEffect, useState} from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import MUIDataTable from "mui-datatables";


function Sectiontable() {

    const [responsive, setResponsive] = React.useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = React.useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const [databig, setDatabig] = React.useState([])

    useEffect(async ()=>{
        const obj = "get"
        var result = await req.fetchAdmins(obj, 4)
        setDatabig(result)

    }, [])
    
    const columns = ["Bookid", "Title", "Author", "Co-Author", "Language", "Publisher", "Pages", "Volume", "Category", "keywords"];

    
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight
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
       
      <MUIDataTable
        title={"Book List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
    </>
)
}

export default Sectiontable;