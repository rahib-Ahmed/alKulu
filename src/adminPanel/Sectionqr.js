import React from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';

function Sectionqr() {
    const [data, setData] = React.useState()

    async function submit() {
        const obj = {
            id: 1
        }
        var result = await req.fetchAdmins(obj, 3) 
        setData(result.qr)
    }
return (
    <>
    <div className="section">
    <button onClick={()=>{submit()}} type="submit">Submit</button>
    <img width="100px" src={data} />
    </div>
    </>
)
}

export default Sectionqr;