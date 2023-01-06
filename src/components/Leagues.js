import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Navigate } from 'react-router-dom';

import logo from '../assets/Miami-Heat-logo.png';

//let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');
let baseUrl = 'https://heat-server20221212094254.azurewebsites.net/api/scoutingreports/';

class Leagues extends Component {
    constructor() {
        super();
        this.state = {
            leagueData: [],
            move: false,
            leagueKey: ''
        }
    }     
   
    componentDidMount = async () => {
        var config = {
            method: 'get',
            url: baseUrl + 'Leagues',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*'            
            }
        };
        
        axios(config)
            .then(res => {
                console.log(res);
                this.setState({leagueData: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    teamsFlag = async (leagueKey) => {
        if(leagueKey) {
           this.setState({leagueKey: leagueKey});
           this.setState({ move: true });
        }
    }

    render() {
        if(this.state.move) {         
            let path = '/teams';  
            return (
                <Navigate to={path} state={{leagueKey: this.state.leagueKey}} replace={true} />
            );
        }else {  
            return (
                <div className="App">
                    <header className="App-header">
                        <div className="d-grid gap-2">
                        <br />           
                        <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
                        {this.state.leagueData && this.state.leagueData.map((league) =>
                            <Button variant="danger" size="lg" key={league.leagueKey} value={league.leagueKey} onClick={() => this.teamsFlag(league.leagueKey)}>{league.leagueKey}  {league.leagueName}</Button>
                        )}
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default Leagues;