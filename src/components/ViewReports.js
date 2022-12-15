import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Navigate} from 'react-router-dom';

import logo from '../assets/Miami-Heat-logo.png';

let config = process.env.CONFIG ? process.env.CONFIG : require('../config.json');

class ViewReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scout: this.props.scout,
            reports: [],
            reportToEdit: '',
            editFlag: false
        }
    }

    setEditFlag = (report) => {
        this.setState({reportToEdit: report});
        this.setState({editFlag: true});
    }

    componentDidMount = async () => {
        axios.get(config.BaseUrl + 'ReportsAll?scoutId=' + this.state.scout.scoutKey)
        .then(res => {
            this.setState({reports: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        if(this.state.editFlag) {
            let path = '/editReport';
            return <Navigate to={path} state={{report: this.state.reportToEdit}} />
        }else {
            return (
                <div className="App" style={{backgroundColor: "#ffffff"}}>
                <header className="App-header">
                    <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                    <div className="d-grid gap-2">
                    <br />
                    <h4>ScoutId: {this.state.scout.scoutKey}</h4>
                    <h4>{this.state.scout.firstName} {this.state.scout.lastName}</h4>
                    <hr />
                    <div className="container">
                    {this.state.reports && this.state.reports.map((report) =>
                        <Card key={report.reportKey} bg="dark" text="light">
                        <Card.Header as="h2">Report Key: {report.reportKey}</Card.Header>
                        <Card.Body>
                            <Card.Title>{report.playerName} ({report.playerKey})</Card.Title>
                            <Card.Text>
                                Assist: {report.assist}<br />
                                Defense: {report.defense}<br />
                                Rebound: {report.rebound}<br />
                                Shooting: {report.shooting}<br />
                                Comments: {report.comments}
                            </Card.Text>
                            <Button variant="primary" onClick={() => this.setEditFlag(report)}>Edit Report</Button>
                        </Card.Body>
                        </Card>                    
                    )}
                    <br />
                    </div>
                    </div>               
                </header>
                </div>
            );
        }
    }
}

export default ViewReports;