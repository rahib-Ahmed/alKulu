import React from "react";
import QrReader from "react-qr-reader";



import { useHistory } from "react-router-dom";

function Camera() {
  
  const [delay,setDelay] = React.useState(300);
  const [result,setResult] = React.useState('Plas scan properly');
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

 const handleScan = (data) => {
    if (data) {
      setResult(data);
      setOpen(true)
    }
  }
  const handleError = (err) => {
    console.error(err);
  }
  
    return (
      <div className="posi">
        <Header className="pc1"  />
        <QrReader 
        className="camera"
        showViewFinder={false}
          delay={delay}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
    );
}

export default Camera;