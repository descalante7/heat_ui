import React, { Component } from 'react';
import axios from 'axios';

import logo from '../assets/Miami-Heat-logo.png';


let baseUrl = 'https://heat-server20221212094254.azurewebsites.net/api/scoutingreports/';

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playersData: [],
            teamKey: this.props.teamKey
        }
    }     
   
    componentDidMount = async () => {
        let yr = new Date().getFullYear() - 1;
        axios.get(baseUrl + 'PlayersByTeam?seasonKey=' + yr + '&teamKey=' + this.state.teamKey)
            .then(res => {
                console.log(res);
                this.setState({playersData: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }  

    render() {      
        return (
            <div className="App">
                <header className="App-header">
                    <div className="d-grid gap-2">
                    <br />           
                    <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
                    <div className="container">
                    <h4>Team Key: {this.state.teamKey}</h4>
                    {this.state.playersData && this.state.playersData.map((player) =>                        
                            <pre key={player.playerKey}>{JSON.stringify(player, null, 2)}</pre>              
                    )}
                    </div>
                    </div>
                </header>
            </div>
        );
        
    }
}

export default Players;