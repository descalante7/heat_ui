import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {Link, Navigate} from 'react-router-dom';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');

class ScoutPortal extends Component {
    constructor() {
        super();
        this.state = {
            scouts: [],
            scout: {},
            name: '',
            createScoutFlag: false,
            selectScoutFlag: false
        }
    }

    selectScout = (scoutObj) => {
        this.setState({selectScoutFlag: true});
        this.setState({scout: scoutObj});
    }

    setScoutFlag = () => {
        this.setState({createScoutFlag: true});
    }

    searchHandler = (e) => {   
        e.preventDefault();       
        this.setState({name: e.target.value});
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
        
        if(this.state.createScoutFlag) {
            let path = '/createScout';
            return <Navigate to={path} />
        }else if(this.state.selectScoutFlag){
            let path = '/selectScout';
            return <Navigate to={path} state={{scout: this.state.scout}} />
        }else {
            return (
                <div className="App" style={{backgroundColor: "#ffffff"}}>
                <header className="App-header">
                    <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                    <div className="d-grid gap-2">
                    <br />
                    <h3>Select Existing Scout</h3>
                    <form>
                        <input type="search" name="scout" value={this.state.name} onChange={this.searchHandler} />          
                    </form>
                    <ul>                    
                    {this.state.scouts && list.map((scout) =>
                            <li><Link key={scout.scoutKey} value={scout} onClick={() => this.selectScout(scout)}>{scout.scoutKey} {scout.firstName} {scout.lastName}</Link></li>
                    )}
                    </ul>
                    <br /><h3>OR</h3><br />
                    <Button variant="danger" size="lg" onClick={this.setScoutFlag}>
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
}

export default ScoutPortal;