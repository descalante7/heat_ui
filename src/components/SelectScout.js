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
           editReportFlag: false
        }
    }

    toggleRouteFlag = (path) => { 
        if(path === '/createReport') {      
            this.setState({createReportFlag: true});
        }else if(path === '/editReport') {
            this.setState({ editReportFlag: true});
        }
    } 

    render() {
        if(this.state.createReportFlag) {
            let path = '/createReport';  
            return (
                <Navigate to={path} state={{scout: this.state.scout}} />
            );
        }else if(this.state.editReportFlag) {
            let path = '/editReport';  
            return (
                <Navigate to={path} state={{scout: this.state.scout}} />
            );
        }else {
            return (
            <div className="App">
            <header className="App-header">
                    <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                    <div className="d-grid gap-2">
                    <br />
                    <h4>ScoutId: {this.state.scout.scoutKey}</h4>
                    <h4>{this.state.scout.firstName} {this.state.scout.lastName}</h4>
                    <hr />
                    <Button variant="danger" size="lg" onClick={() => this.toggleRouteFlag('/createReport')}>
                        Create New Report
                    </Button>
                    <Button variant="danger" size="lg" onClick={() => this.toggleRouteFlag('/editReport')}>
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