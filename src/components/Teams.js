import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link, useHistory, withRouter, useParams} from 'react-router-dom';

import logo from '../assets/Miami-Heat-logo.png';


let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');

class Teams extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            teamData: [],
            playerData: [],
            leagueKey: this.props.leagueKey,
            move: false
        }
    }     
   
    componentDidMount = async () => {
        axios.get(config.BaseUrl + 'teams?leagueKey=' + this.state.leagueKey)
            .then(res => {
                console.log(res);
                this.setState({teamData: res.data});
            })          
            .catch(err => {
                console.log(err);
            });
    }

    playersFlag = async (teamKey) => {
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
                    {this.state.teamData && this.state.teamData.map((team) =>
                        <Button variant="danger" size="lg" key={team.teamKey} value={team.teamKey} onClick={() =>this.playersFlag('/players')}>{team.teamKey}  {team.teamName}</Button>
                    )}
                    </div>
                </header>
            </div>
        );
    }
}

export default Teams;