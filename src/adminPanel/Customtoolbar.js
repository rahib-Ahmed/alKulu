import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import * as req from "../backend/adminBackend";
import Adminmodal from './Modal';

const dropStyles = {
 iconButton: {
  color: "rgb(51, 75, 73)",
  
 }, 
 deleteIcon: {
  color: "rgb(51, 75, 73)",
  marginRight: '20px'
 }

};
function CustomToolbar(props) {
  const [open, setOpen] = React.useState(true)
  const [openback, setOpenback] = React.useState(false)
  const data = props
 
  const id = data.selectedRows.table[data.selectedRows.select.data[0].dataIndex].data[0]
  var deleteid = []
// console.log(props)
  var handleDelete = async () => {
    for(var i = 0; i<data.selectedRows.select.data.length; i++) {
      deleteid.push(data.selectedRows.table[data.selectedRows.select.data[i].dataIndex].data[0])
    }
    
    const obj = {
      deleteid: deleteid,
      type: 'delete'
    }
    var result = await req.fetchAdmins(obj, 5)
    if(result.action === "Deleted Successfully"){
      localStorage.setItem("second", true)
      window.location.replace("/Dashboard")
    }
  }

  var handleEdit = () =>{
    if(data.selectedRows.select.data.length > 1) {
      alert("cannot edit more than one field at a time")
    } else {
      setOpen(true)
    }
    // console.log("modal!")
  }
  const classes = dropStyles

    return (<>
      <React.Fragment>
       <div>
          <IconButton className={classes.iconButton} onClick={()=>{handleDelete()}}>
            <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
            <IconButton>
            <EditIcon onClick={()=>{handleEdit()}} className={classes.editIcon} />
          </IconButton>    
          </div>
      </React.Fragment>
      <Adminmodal data={{type: 4, edit: "edit", bkid: id, states: open, stated: openback}} />
</>
    );
  

}

export default withStyles(dropStyles, { name: "CustomToolbar" })(CustomToolbar);