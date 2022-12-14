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
                <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                <div className="d-grid gap-2">
                <br />
                <div className="container">
                    <pre>{JSON.stringify(this.state.player, null, 2)}</pre>
                </div>
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

export default Player;