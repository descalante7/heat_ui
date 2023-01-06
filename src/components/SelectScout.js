import React, {Component} from 'react';
import {Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

class SelectScout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           scout: this.props.scout,
           createReportFlag: false,
           viewReportsFlag: false
        }
    }

    toggleRouteFlag = (path) => { 
        if(path === '/createReport') {      
            this.setState({createReportFlag: true});
        }else if(path === '/viewReports') {
            this.setState({ viewReportsFlag: true});
        }
    } 

    render() {
        if(this.state.createReportFlag) {
            let path = '/createReport';  
            return (
                <Navigate to={path} state={{scout: this.state.scout}} />
            );
        }else if(this.state.viewReportsFlag) {
            let path = '/viewReports';  
            return (
                <Navigate to={path} state={{scout: this.state.scout}} />
            );
        }else {
            return (
            <div className="App">
            <header className="App-header">
                    <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
                    <div className="d-grid gap-2">
                    <br />
                    <h4>ScoutId: {this.state.scout.scoutKey}</h4>
                    <h4>{this.state.scout.firstName} {this.state.scout.lastName}</h4>
                    <hr />
                    <Button variant="danger" size="lg" onClick={() => this.toggleRouteFlag('/createReport')}>
                        Create New Report
                    </Button>
                    <Button variant="danger" size="lg" onClick={() => this.toggleRouteFlag('/viewReports')}>
                        Edit Existing Report
                    </Button>
                    </div>           
                </header>
                </div>
            );
        }
    }
}

export default SelectScout;