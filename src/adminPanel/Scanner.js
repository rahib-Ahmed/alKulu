import React from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import Adminmodal from "./Modal";
import { fetchAdmins } from '../backend/adminBackend';
function Scanner() {
  
  const [delay,setDelay] = React.useState(300);
  const [result,setResult] = React.useState('Plas scan properly');
  const [open, setOpen] = React.useState(false);
  const [openback,setopenback] = React.useState(false)
  const [data, setData] = React.useState({})
  const history = useHistory();

 const handleScan = async (data) => {
    if (data) {
      console.log(typeof data)
      const para = new URL(data)
      console.log(para)
      const id = new URLSearchParams(para.search)
      var iD = id.get('bookid')
      const result =  await fetchAdmins(iD, 9)
      setData(result)
      setOpen(true)
    }
  }
  const handleError = (err) => {
    console.error(err);
  }

    return (
      <>
      <div className="section">
       <div className="secHeader">
                <div className="upload-books">
                  Scanner
                </div>
       </div>  
            <div className="midsec4">
        <QrReader 
        className="camera"
        showViewFinder={false}
          delay={delay}
          onError={handleError}
          onScan={handleScan}
        />
        </div>
      </div>
      <Adminmodal data={{type: 3, states: open, stated: openback, qrdata: data}} />
      </>
    );
}

export default Scanner;