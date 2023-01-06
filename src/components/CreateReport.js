import React, {Component} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

let baseUrl = 'https://heat-server20221212094254.azurewebsites.net/api/scoutingreports/';

class CreateReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scout: this.props.scout,
            playerKey: '',
            defense: '',
            rebound: '',
            shooting: '',
            assist: '',
            comments: '',
            isDeleted: false
        }
    }

    notifySuccess = (text) => {
        toast.success(text, {duration: 7000});
    }

    notifyError = (text) => {
        toast.error(text, {duration: 7000});
    }

    addReportHandler = (e) => {
        let name  = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    submitReport = async(e) => { 
        e.preventDefault();       
        let body = {
            ScoutKey: Number(this.state.scout.scoutKey),
            PlayerKey: Number(this.state.playerKey),
            TeamKey: Number(this.state.scout.teamKey),
            Defense: Number(this.state.defense),
            Rebound: Number(this.state.rebound),
            Shooting: Number(this.state.shooting),
            Assist: Number(this.state.assist),
            Comments: this.state.comments,
            IsActiveFlag: true
        }; 

        //this.setState({});        
        
        await axios({
            method: 'post',
            url: baseUrl + 'CreateReport',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'},
            data: body
        }).then(res => {    
            this.setState({
                playerKey: '',
                defense: '',
                rebound: '',
                shooting: '',
                assist: '',
                comments: ''                
            });     
            this.notifySuccess('Report entered successfully!');
        })
        .catch(err => {
            console.log(err);
            this.notifyError(JSON.stringify(err));
        });
    }

    render() {
        return (
            <div className="App">
            <a href="https://heat-ui.azurewebsites.net/"><img src={logo}  alt="logo" /></a>
            <form onSubmit={this.submitReport}>
                    <br />
                    <h3>Enter Report Information</h3>
                    <p>Scout Key</p>
                    <input type="text" name="scoutKey" value={this.state.scout.scoutKey} />
                    <p>Team Key</p>
                    <input type="text" name="teamKey" value={this.state.scout.teamKey} />
                    <p>Player Key</p>
                    <input type="text" name="playerKey" onChange={this.addReportHandler} />
                    <p>Defense</p>
                    <input type="text" name="defense" onChange={this.addReportHandler} />
                    <p>Rebound</p>
                    <input type="text" name="rebound" onChange={this.addReportHandler} />
                    <p>Shooting</p>
                    <input type="text" name="shooting" onChange={this.addReportHandler} />
                    <p>Assist</p>
                    <input type="text" name="assist" onChange={this.addReportHandler} />
                    <p>Comments</p>
                    <textarea type="text" name="comments" onChange={this.addReportHandler} />
                    <p></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Toaster />                  
                </form> <br />
            </div>
        );
    }
}

export default CreateReport;