import React, {Component} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

let baseUrl = 'https://heat-server20221212094254.azurewebsites.net/api/scoutingreports/';

class EditReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: this.props.report,
            assist: this.props.report.assist,
            defense: this.props.report.defense,
            rebound: this.props.report.rebound,
            shooting: this.props.report.shooting,
            comments: this.props.report.comments
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
            TeamKey: Number(this.state.report.teamKey),
            Shooting: Number(this.state.shooting),
            Assist: Number(this.state.assist),
            Defense: Number(this.state.defense),
            Rebound: Number(this.state.rebound),            
            Comments: this.state.comments
        }; 

        //this.setState({});        
        
        await axios({
            method: 'put',
            url: baseUrl + 'UpdateReport?reportId=' + this.state.report.reportKey,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'},
            data: body
        }).then(res => {
            console.log(res.data);   
            this.setState({
                playerKey: '',
                defense: '',
                rebound: '',
                shooting: '',
                assist: '',
                comments: ''                
            });
            this.notifySuccess('Report edited successfully!');
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
            <form onSubmit={this.submitEditedReport}>
                    <br />
                    <h3>Edit Report</h3>
                    <p>Scout Key</p>
                    <input type="text" name="reportKey" value={this.state.report.scoutKey} />
                    <p>Team Key</p>
                    <input type="text" name="teamKey" value={this.state.report.teamKey} onChange={this.editReportHandler} />                   
                    <p>Defense</p>
                    <input type="text" name="defense" defaultValue={this.state.report.defense} onChange={this.editReportHandler} />
                    <p>Rebound</p>
                    <input type="text" name="rebound" defaultValue={this.state.report.rebound} onChange={this.editReportHandler} />
                    <p>Shooting</p>
                    <input type="text" name="shooting" defaultValue={this.state.report.shooting} onChange={this.editReportHandler} />
                    <p>Assist</p>
                    <input type="text" name="assist" defaultValue={this.state.report.assist} onChange={this.editReportHandler} />
                    <p>Comments</p>
                    <textarea type="text" name="comments" defaultValue={this.state.report.comments} onChange={this.editReportHandler} />
                    <p></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Toaster />                  
                </form> <br />
            </div>
        );
    }
}

export default EditReport;