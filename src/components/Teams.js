import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';

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
            playerMove: false,
            playersMove: false,
            player: {},            
            teamKey: '',         
            name: '',
            listPlayers: false
        }
    }

    searchHandler = (e) => {   
        e.preventDefault();
        if(e.target.value.length > 1) {
            this.setState({listPlayers: true});
        }else {
            this.setState({listPlayers: false});
        }
        this.setState({name: e.target.value});
    }
   
    componentDidMount = async () => {
        axios.get(config.BaseUrl + 'teams?leagueKey=' + this.state.leagueKey)
        .then(res => {
            console.log(res);
            this.setState({teamData: res.data});
            let yr = new Date().getFullYear();
            return axios.get(config.BaseUrl + 'Players?seasonKey=' + yr)
        })
        .then(res =>{
            console.log(res);
            this.setState({playerData: res.data});
        })       
        .catch(err => {
            console.log(err);
        });
    }

    playersFlag = async (teamKey) => {
        if(teamKey) {
           this.setState({teamKey: teamKey});
           this.setState({ playersMove: true });
        }
    }

    directToPlayer = (playerObj) => {
        this.setState({player: playerObj});
        this.setState({playerMove: true});
    }  

    render() {
        let list = this.state.playerData
            .filter(d => this.state.name === '' || d.firstName.toLowerCase().includes(this.state.name.toLowerCase()));              

             //.map((d, index) => <li key={index}>{d}</li>);
        if(this.state.playerMove || this.state.playersMove) {
            if(this.state.playerMove) {
                let path = '/player';
                return <Navigate to={path} state={{player: this.state.player}} replace={true} />
            }else {
                let path = '/players';
                return <Navigate to={path} state={{teamKey: this.state.teamKey}} replace={true} />
            }
        }else {
            return (
                <div className="App">
                    <header className="App-header">
                        <div className="d-grid gap-2">
                        <br />           
                        <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                        <h3>Current Player Search</h3>
                        <form>
                            <input type="search" name="player" value={this.state.name} onChange={this.searchHandler} />                     
                        </form>
                        <ul>                    
                        {this.state.listPlayers && this.state.playerData && list.map((player) => 
                                <li><Link key={player.playerKey} value={player} onClick={() => this.directToPlayer(player)}>{player.firstName} {player.lastName}</Link></li>
                        )}
                        </ul>
                        
                        <br />
                        <h3>Player Search by Team</h3>
                        {this.state.teamData && this.state.teamData.map((team) =>
                            <Button variant="danger" size="lg" key={team.teamKey} value={team.teamKey} onClick={() =>this.playersFlag(team.teamKey)}>{team.teamKey}  {team.teamName}</Button>
                        )}
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default Teams;