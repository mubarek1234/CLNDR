import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';
import apiHost from './config'

import firebase from './firebase'
import EventPage from "./EventPage";
import axios from "axios";

var secAns;
var newPass;
var confPass;
var secQuest;
var userName;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

class EditAccountInfo extends Component {

    constructor(props) {
        super(props);

        const eventID = this.props.username;


        this.state = {
            data: null,
            changeDone: false,
            username:"",
            passW:"",
            securityQuestion:"",
            securityAnswer:"",
            accMade : false,
            secAnsError: '',
            passError: '',
            confError: ''

        };

    };

    componentDidMount = () => {
        let userToken = localStorage.getItem('jwtToken');
        if (userToken === null) {
            this.setState({
                userID: "log in for this",
                viewForm: "log in for this",
                username: "log in for this",
                accountLevel: "log in for this",
                email: "log in for this",
                deleteText: "Delete My Account",
                editAccount: "false",
                guest: true
            });
        }
        else {
            axios.get(apiHost + ':5000/accountInfo', {
                headers: { Authorization: 'JWT ' + userToken },
            })
                .then(response => {
                    if (response.data.success) {
                        this.setState({
                            username: response.data.data.username,
                            securityQuestion: response.data.data.sec_question
                        });
                    }
                    else { }
                })
                .catch(error => {
                    console.log(error.data);
                });
        }
        axios.post(apiHost + ":5000/userInfo", {
            username: this.props.match.params.id
        }).then(response => {
            if (response.data.success) {
                this.setState({
                    username: response.data.data.username,
                    passW: response.data.data.password,
                    securityQuestion: response.data.data.sec_question,
                    securityAnswer: response.data.data.sec_answer
                })
            }
            else {
                alert(this.props.match.params.id);
                this.props.history.push('/');
            }
        });
    };


    handleUpdateAccount() {
        var change = true
        
        var secQuest = document.getElementById('secQ').value;
        var secAns = document.getElementById('secA').value;
        var newPass = document.getElementById( 'newP').value;
        var confPass = document.getElementById( 'conP').value;
        var userName = document.getElementById('newUsername').value;

        if(newPass !== confPass) {change = false}
        if(secQuest.length === 0) {secQuest=this.state.securityQuestion}
        if(secAns.length === 0) {secAns=this.state.securityAnswer}
        if(newPass.length === 0 && confPass.length === 0) {newPass=this.state.passW}
        if(userName.length === 0) {userName=this.state.username}


        let userToken = localStorage.getItem('jwtToken');
        if (change) {
            this.setState({
                accMade: true
            })
            axios.post(apiHost + ':5000/updateAccount', {
                username: userName,
                sec_question: secQuest,
                sec_answer: secAns,
                password: newPass
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            })
                .then(response => {
                    if (response.data.success) {
                        alert("Sweet! Your account info has been updated. Please log in.")
                        localStorage.clear()
                        this.props.history.push("/");
                    }
                    else {
                        alert(response.data.message);
                    }
            })
        }
        else { alert("Invalid Entries") }
    }


    handleChange = () => {
        var secQuest = document.getElementById('secQ').value;
        var secAns = document.getElementById('secA').value;
        var newPass = document.getElementById( 'newP').value;
        var confPass = document.getElementById( 'conP').value;
        var userName = document.getElementById('newUsername').value;

        if(newPass!=confPass){
            this.setState({passError: 'Password must match password confirmation'})
        }
        else{
            this.setState({passError: ''})
        }

    }




    render() {
        const {errors} = this.state;
        return (
            <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                <div style= {styles.centerDiv}>
                    <img src={logo} style= {{width: 100, height: 100}}/>
                    <h1>Edit Account Info</h1>
                </div>
                <div style= {styles.centerDiv}>
                    <h4>Only fill in the info you want changed</h4>
                </div>
                <div class='events'>

                <div class='left'>
                    <label>Username:&nbsp;</label>
                    <input type="text" name='username' id="newUsername"
                            onChange={this.handleChange}/>
                </div>
                <div class='left'>
                    <label>Security Question:&nbsp;</label>
                    <input type="text" name='secQuestion' id="secQ"
                            onChange={this.handleChange}/>
                </div>

                <div class='left'>
                    <label>Security Question Answer:&nbsp;</label>
                    <input type="text" name='secAnswer' id="secA"
                            onChange={this.handleChange}/>
                </div>

                <div class='left'>
                    <label>New Password:&nbsp;</label>
                    <input type="password" name='newPassword' id="newP"
                            onChange={this.handleChange}/>
                </div>

                <div class='left'>
                    <label>Confirm New Password:&nbsp;</label>
                    <input type="password" name="confirmPass" id="conP"
                            onChange={this.handleChange}/>

                </div>


                <div style={styles.centerDiv}>
                    <button class='control_button' onClick={this.handleUpdateAccount.bind(this)}>
                        Confirm
                    </button>
                <a href= "/account">
                    <button class='control_button'>
                        Go Back
                    </button>
                </a>
                    
                    
                </div>

                <div class='left'>
                        <b>{this.state.secAnsError}</b>
                    </div>
                    <div class='left'>
                        <b>{this.state.passError}</b>
                    </div>
                    <div class='left'>
                        <b>{this.state.confError}</b>
                    </div>

            </div>





            </div>


        );
    }
}


const styles = {
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    allButton: {
        height: 40,
        width: 175
    }
};


export default EditAccountInfo;
