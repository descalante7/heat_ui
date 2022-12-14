import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Navigate } from 'react-router-dom';

import logo from '../assets/Miami-Heat-logo.png';


let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');

class Players extends Component {
    constructor() {
        super();
        this.state = {
            playersData: [],
            move: false,
            teamKey: ''
        }
    }     
   
    componentDidMount = async () => {
        axios.get(config.BaseUrl + 'PlayersByTeam?seasonKey=2022&teamKey=' + this.state.teamKey)
            .then(res => {
                console.log(res);
                this.setState({playersData: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    teamsFlag = async (teamKey) => {
        if(teamKey) {
           this.setState({teamKey: teamKey});
           this.setState({ move: true });
        }
    }

    render() {      
        return (
            <div className="App">
                <header className="App-header">
                    <div className="d-grid gap-2">
                    <br />           
                    <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                    {this.state.playersData && this.state.playersData.map((player) =>
                        <p>{player}</p>
                    )}
                    </div>
                </header>
            </div>
        );
        
    }
}

export default Leagues;