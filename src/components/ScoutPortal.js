import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';


class ScoutPortal extends Component {
    constructor() {
        super();
        this.state = {
            scouts = [];
        }
    }   

    componentDidMount = async () => {
        axios.get(config.BaseUrl + 'scouts')
            .then(res => {
                console.log(res);
                this.setState({scouts: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }    

    render() {
        let list = this.state.scouts
            .filter(d => this.state.name === '' || d.firstName.toLowerCase().includes(this.state.name.toLowerCase())); 
       
        return (
            <div className="App" style={{backgroundColor: "#ffffff"}}>
            <header className="App-header">
                <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                <div className="d-grid gap-2">
                <br />

                 <form>
                    <input type="search" name="player" value={this.state.name} onChange={this.searchHandler} />                     
                </form>
                <ul>                    
                {this.state.listPlayers && this.state.playerData && list.map((player) => 
                        <li><Link key={player.playerKey} value={player} onClick={() => this.directToPlayer(player)}>{player.firstName} {player.lastName}</Link></li>
                )}
                </ul>

                <Button variant="danger" size="lg" onClick={() => routeChange('/createScout')}>
                    Create New Scout
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
}

export default ScoutPortal;