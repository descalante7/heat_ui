import React, {Component} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

//import '../App.css';
import logo from '../assets/Miami-Heat-logo.png';

let config = (process.env.CONFIG) ? require(process.env.CONFIG) : require('../config.json');

class CreateScout extends Component {
    constructor() {
        super();
        this.state = {
           fName: '',
           lName: '',
           email: '',
           phone: '',
           teamKey: ''
        }
    }

    notifySuccess = (text) => {
        toast.success(text, {duration: 7000});
    }

    notifyError = (text) => {
        toast.error(text, {duration: 7000});
    }

    addScoutHandler = (e) => {
        let name  = e.target.name;
        let val = e.target.value;
        this.setState({[name]: val});
    }

    submitScout = async(e) => {        
        let body = {
            TeamKey: Number(this.state.teamKey),
            FirstName: this.state.fName,
            LastName: this.state.lName,
            Email: this.state.email,
            Phone: this.state.phone,
            IsActiveFlag: true
        }; 

        this.setState({fName: ''});
        this.setState({lName: ''});
        this.setState({email: ''});
        this.setState({phone: ''});
        this.setState({teamKey: ''});      
        e.preventDefault();
        await axios({
            method: 'post',
            url: config.BaseUrl + 'CreateScout',
            headers: {'Content-Type': 'application/json'},
            data: body
        }).then(res => {           
            this.notifySuccess('Scout entered successfully!');
        })
        .catch(err => {
            console.log(err);
            this.notifyError(JSON.stringify(err));
        });
    }

    render() {
        return (
            <div className="App" style={{backgroundColor: "#ffffff"}}>
            <a href="http://localhost:3000"><img src={logo}  alt="logo" /></a>
            <form onSubmit={this.submitScout}>
                    <br />
                    <h3>Enter Scout Information</h3>
                    <p>First Name</p>
                    <input type="text" name="fName" onChange={this.addScoutHandler} />
                    <p>Last Name</p>
                    <input type="text" name="lName" onChange={this.addScoutHandler} />
                    <p>Email</p>
                    <textarea type="text" name="email" onChange={this.addScoutHandler} />
                    <p>Phone</p>
                    <input type="text" name="phone" onChange={this.addScoutHandler} />
                    <p>Team Key</p>
                    <input type="text" name="teamKey" onChange={this.addScoutHandler} />
                    <p></p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Toaster />                  
                </form> <br />
            </div>
        );
    }
}

export default CreateScout;