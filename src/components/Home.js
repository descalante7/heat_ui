import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';


let Home = () => {

    let navigate = useNavigate();

    const routeChange = (path) =>{        
        navigate(path);
    }

    return (
        <div className="App" style={{backgroundColor: "#ffffff"}}>
        <header className="App-header">
            <img src={logo}  alt="logo" />
            <div className="d-grid gap-2">
            <br />
            <Button variant="danger" size="lg" onClick={() => routeChange('/leagues')}>
                League & Player Information
            </Button>
            <Button variant="danger" size="lg" onClick={() => routeChange('/scoutPortal')}>
                Manage Scouting Reports
            </Button>
            </div>
            {/* <p>
            Edit <code>src/App.js</code> and save to reload.
            </p> */}
            {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a> */}
        </header>
        </div>
    );
}

export default Home;