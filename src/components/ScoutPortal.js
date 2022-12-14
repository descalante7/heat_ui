import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';


class ScoutPortal extends Component {
    constructor() {
        super();
        this.state = {
            scouts: [],
            scout: {},
            name: '',
            createScoutFlag: false
        }
    }

    selectScout = (scoutObj) => {
        setState({scout: scoutObj});
    }

    setScoutFlag() => {
        setState({createScoutFlag: true});
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
        
        if(createScoutFlag) {
            let path = '/createScout';
            return <Navigate to={path} />
        }else {
            return (
                <div className="App" style={{backgroundColor: "#ffffff"}}>
                <header className="App-header">
                    <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
                    <div className="d-grid gap-2">
                    <br />

                    <form>
                        <input type="search" name="scout" value={this.state.name} onChange={this.searchHandler} />          
                    </form>
                    <ul>                    
                    {this.state.scouts && list.map((scout) =>
                            <li><Link key={scout.scoutKey} value={scout} onClick={() => this.selectScout(scout)}>{scout.firstName} {scout.lastName}</Link></li>
                    )}
                    </ul>

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