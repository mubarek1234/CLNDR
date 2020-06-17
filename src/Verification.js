import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import axios from "axios";
import apiHost from './config'
var email;
var org;
var pic;

class Verification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applicationError: '',
            emailError: '',
            orgError: '',
            picError: ''

        };
    };

    validateFields() {
        var email = document.getElementById('email').value;
        var org = document.getElementById( 'oName').value;
        var pic = document.getElementById( 'pic').value;

        if(email.length==0){
            this.setState({emailError: 'Please enter an email'})
        }
        else{
            this.setState({emailError: ''})
        }

        if(org.length==0){
            this.setState({orgError: 'Please enter an organization name'})
        }
        else{
            this.setState({orgError: ''})
        }

        if(pic.length==0){
            this.setState({picError: 'Please provide a profile picture URL'})
        }
        else{
            this.setState({picError: ''})
        }
    }


    handleVerify(){
        email = document.getElementById('email').value;
        org = document.getElementById('oName').value;
        pic = document.getElementById('pic').value;

        

        if(email.length > 0 && org.length > 0 && pic.length > 0){
            const userToken = localStorage.getItem('jwtToken');

            if (userToken !== null) {
                axios.post(apiHost + ":5000/requestVerification",
                {
                    contact_email: email,
                    org_name: org,
                    profile_pic_url: pic

                },
                {
                    headers: { Authorization: 'JWT ' + userToken },
                }).then(response => {
                    if (response.data.success) {
                        alert("Sweet! Your application has been submitted. A representative of CLNDR will be in contact with you through your submitted email!");
                        this.props.history.push('/account');
                    }
                    else {
                        this.setState({
                            applicationError: response.data.message
                        });
                    }
                });
            }
            else {
                this.setState({
                    applicationError: "You must be logged in to do this."
                });
            }
        }
        else {
            this.validateFields();
        }
    }

    handleChange = () => {
        this.validateFields();
    }

    render() {
        return (
            <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                <div style= {styles.centerDiv}>
                    <img src={logo} style= {{width: 100, height: 100}}/>
                    <h1>Verification Application</h1>
                </div>
                <div class='events'>
                    <div class='left'>
                        <label>Contact Email:&nbsp;</label>
                        <input type="text" name='contEmail' id="email"
                                onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>Organization Name:&nbsp;</label>
                        <input type="text" name='orgName' id="oName"
                                onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>Profile Picture URL:&nbsp;</label>
                        <input type="text" name="profPic" id="pic"
                                onChange={this.handleChange}/>
                    </div>


                    <div style={styles.centerDiv}>
                        <button class='control_button' onClick={this.handleVerify.bind(this)}>
                            Confirm
                        </button>
                        <a href= "/account">
                            <button class='control_button'>
                                Go Back
                            </button>
                        </a>
                    </div>

                    {this.state.applicationError.length > 0 &&
                        <div class='left'>
                            <b>{this.state.applicationError}</b>
                        </div>                
                    }

                    {this.state.emailError.length > 0 &&
                        <div class='left'>
                            <b>{this.state.emailError}</b>
                        </div>                
                    }

                    {this.state.orgError.length > 0 &&
                        <div class='left'>
                            <b>{this.state.orgError}</b>
                        </div>
                    }

                    {this.state.picError.length > 0 &&
                        <div class='left'>
                            <b>{this.state.picError}</b>
                        </div>
                    }
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


export default Verification;
