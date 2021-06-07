import React, {useEffect} from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from './Customtoolbar'

function Sectionmanager() {
  const [responsive, setResponsive] = React.useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = React.useState("450px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
  const [databig, setDatabig] = React.useState([])

  useEffect(async ()=>{
    
    const obj = {};
    var result = await req.fetchAdmins(obj, 8)
    setDatabig(result)

}, [])
    console.log(databig)
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    customToolbarSelect: (selectedRows, tableMeta) => <CustomToolbarSelect selectedRows={{table: tableMeta, select: selectedRows}} />
  };
  const columns = [
    "Bookid", 
    "User Name", 
    "Book Name", 
    "Author", 
    "Publisher", 
    "Issue Date", 
    "Due Date", 
    "Contact",
    "Status"
  ];
  
  var data = []
   
  for(var i = 0; i<databig.length; i++) {
    data.push([
      databig[i].bookid,
      databig[i].username,
      databig[i].bookname,
      databig[i].author,
      databig[i].publisher,
      databig[i].issuedate,
      databig[i].duedate,
      databig[i].contact.toString(),
      databig[i].status.toString()
    ])

}

return (
    <>
    <div className="section">
    <div className="secHeader">
                <div className="upload-books">
                  Manager
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
    </>
)
}

export default Sectionmanager;