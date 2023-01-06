import React, {Component} from 'react';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
           player: this.props.player
        }
    }    

    render() {
        return (
            <div className="App" style={{backgroundColor: "#ffffff"}}>
            <header className="App-header">
                <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
                <div className="d-grid gap-2">
                <br />
                <div className="container">
                    <pre>{JSON.stringify(this.state.player, null, 2)}</pre>
                </div>
                </div>               
            </header>
            </div>
        );
    }
}

export default Player;