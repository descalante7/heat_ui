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
        <div className="App">
        <header className="App-header">
            <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
            <div className="d-grid gap-2">
            <br />
            <Button variant="danger" size="lg" onClick={() => routeChange('/leagues')}>
                League & Player Information
            </Button>
            <Button variant="danger" size="lg" onClick={() => routeChange('/scoutPortal')}>
                Manage Scouting Reports
            </Button>
            </div>           
        </header>
        </div>
    );
}

export default Home;