import React, { useEffect } from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import Print from '../images/printer.svg'
import Download from '../images/download.svg'
function Sectionqr(props) {
    const [data, setData] = React.useState()
    const [id, setId] = React.useState()
    useEffect(()=>{
        var x = localStorage.getItem("currentID")
        if(x === null) {} else {
            var curID = parseInt(localStorage.getItem("currentID"))
            setId(curID)
        }
    }, [])
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
        });}
    async function getQR() {
        const obj = {
            id: id
        }
        var result = await req.fetchAdmins(obj, 3) 
        setData(result.qr)
        localStorage.setItem("currentID", null)
    }
    // console.log(id)
return (
    <>
    <div className="sectionqr">
    <div className="secHeader">
                <div className="upload-books">
                    QR code
                </div>
                <div >
                        <a href={data} download><img src={Download}/></a>
                        <img id="print" onClick={()=>{print()}} style={{marginLeft: '20px', marginRight: '20px'}}src={Print} />
                </div>
            </div>
            <div className="midsec" style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}} >
    <img id="image" className="imageQR" src={data} />

    <div className="botQR">
<p className="txtQR">To generate a QR code for your book {"\n"}
add the book id in the blank below</p>
<input className="inputBookQR"type="number" placeholder="Enter Bok ID" value={id} onChange={(e)=>setId(e.target.value)} /> 
<input className="qrbutton"  type="button" value="Generate QR" onClick={()=>{getQR()}} />
    </div>
    
        
    
            </div>
    </div>
    </>
)
}

export default Sectionqr;