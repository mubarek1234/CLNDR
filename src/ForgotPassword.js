
  
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

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        const eventID = this.props.username;


        this.state = {
            data: null,
            changeDone: false,
            username:"",
            securityQuestion:"",
            accMade : false,
            secAnsError: '',
            passError: '',
            confError: ''

        };

    };

    componentDidMount = () =>{
        axios.get(apiHost + ":5000/userInfo", {
            params: {username: this.props.match.params.id}
        }).then(response => {
            if(response.data.success){
               this.setState({
                    username: response.data.data.username,
                    securityQuestion: response.data.data.sec_question
                })
            }
            else{
                alert("Not a valid username");
                this.props.history.push('/');
            }
        });
    };


    handleForgotPass(){
        secAns = document.getElementById('secQ').value;
        newPass = document.getElementById('newP').value;
        confPass = document.getElementById('conP').value;

        if(secAns.length > 0 && newPass.length > 0 && confPass == newPass){
            this.setState({
                accMade: true
            })

            axios.post(apiHost + ":5000/forgotPassword",
                {
                    username: this.state.username,
                    sec_answer: secAns,
                    new_password: newPass

                }).then(response => {
                    if (response.data.success) {
                        alert("Sweet! Your password has been reset. Please log in.")
                        this.props.history.push('/');
                    }
                    else {
                        alert(response.data.message);
                    }
                })
        }
    }


    handleChange = () => {
        var secAns = document.getElementById('secQ').value;
        var newPass = document.getElementById( 'newP').value;
        var confPass = document.getElementById( 'conP').value;

        if(secAns.length==0){
            this.setState({secAnsError: 'Security Answer cannot be empty'})
        }
        else{
            this.setState({secAnsError: ''})
        }

        if(newPass.length==0){
            this.setState({passError: 'Please enter a password'})
        }
        else if(newPass!=confPass){
            this.setState({passError: 'Password must match password confirmation'})
        }
        else{
            this.setState({passError: ''})
        }

        if(confPass.length==0){
            this.setState({confError: 'Please confirm password'})
        }
        else{
            this.setState({confError: ''})
        }

    }




    render() {
        const {errors} = this.state;
        return (
            <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                <div style= {styles.centerDiv}>
                    <img src={logo} style= {{width: 100, height: 100}}/>
                    <h1>Forgot Password</h1>
                </div>
                <div class='events'>

                <div class='left'>
                    <label>Username: {this.state.username}</label>
                </div>
                <div class='left'>
                    <label>Security Question:&nbsp;{this.state.securityQuestion}</label>
                </div>

                <div class='left'>
                    <label>Security Question Answer:&nbsp;</label>
                    <input type="text" name='secQuestion' id="secQ"
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
                    <button class='control_button' onClick={this.handleForgotPass.bind(this)}>
                        Confirm
                    </button>
                <a href= "/">
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

export default ForgotPassword;


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


EventPage.defaultProps = {username: new String}
