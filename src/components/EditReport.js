import React, {Component} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');

class EditReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: this.props.report
        }
    }

    notifySuccess = (text) => {
        toast.success(text, {duration: 7000});
    }

    notifyError = (text) => {
        toast.error(text, {duration: 7000});
    }

    editReportHandler = (e) => {
        let name  = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    submitEditedReport = async(e) => {
        e.preventDefault();       
        let body = {
            ReportKey: Number(this.state.report.reportKey),
            PlayerKey: Number(this.state.report.playerKey),
            TeamKey: Number(this.state.report.teamKey),
            Defense: Number(this.state.report.defense),
            Rebound: Number(this.state.report.rebound),
            Shooting: Number(this.state.report.shooting),
            Assist: Number(this.state.report.assist),
            Comments: this.state.report.comments,
            IsActiveFlag: true
        }; 

        //this.setState({});        
        
        await axios({
            method: 'put',
            url: config.BaseUrl + 'UpdateReport?reportId=' + this.state.report.reportKey,
            headers: {'Content-Type': 'application/json'},
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
            <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
            <form onSubmit={this.submitEditedReport}>
                    <br />
                    <h3>Edit Report</h3>
                    <p>Scout Key</p>
                    <input type="text" name="reportKey" defaultValue={this.state.report.scoutKey} />
                    <p>Team Key</p>
                    <input type="text" name="teamKey" value={this.state.report.teamKey} onChange={this.editReportHandler} />                   
                    <p>Defense</p>
                    <input type="text" name="defense" value={this.state.report.defense} onChange={this.editReportHandler} />
                    <p>Rebound</p>
                    <input type="text" name="rebound" value={this.state.report.rebound} onChange={this.editReportHandler} />
                    <p>Shooting</p>
                    <input type="text" name="shooting" value={this.state.report.shooting} onChange={this.editReportHandler} />
                    <p>Assist</p>
                    <input type="text" name="assist" value={this.state.report.assist} onChange={this.editReportHandler} />
                    <p>Comments</p>
                    <textarea type="text" name="comments" value={this.state.report.comments} onChange={this.editReportHandler} />
                    <p></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Toaster />                  
                </form> <br />
            </div>
        );
    }
}

export default EditReport;