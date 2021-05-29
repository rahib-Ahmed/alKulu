import React from 'react';
import './dashboard.css';
import Navbar from './Navbar';
import Header from './Header';
import Section from './Section';

function Dashboard() {

    return (
        <div className="container">
            <Navbar/>
            <div className="mid">
                <Header/>
                <Section/>
                </div>
        </div>
    )
}

export default Dashboard