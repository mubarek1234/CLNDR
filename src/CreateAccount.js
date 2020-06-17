import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';
import apiHost from './config'
import firebase from './firebase'
import axios from "axios";


var user,pass,pCon,ques,answ



class CreateAccount extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data     : null,
        userName : null,
        passWord : null,
        secQuest : null,
        secAns   : null,
        accMade  : false,
        errors : {
            userName : '',
            passWord : '',
            passConf : '',
            secQuest : '',
            secAns   : ''
        }
    };

    validateField(name, value, errors) {
        switch (name) {
            case 'userName':
                errors.userName =
                    value.length === 0
                        ? 'Please enter a username.'
                        : '';
                break;
            case 'passWord':
                errors.passWord =
                    value.length === 0
                        ? 'Please enter a password.'
                        : '';
                errors.passConf =
                value !== document.getElementById('passC').value
                    ? 'Password must match password confirmation.'
                    : '';
                break;
            case 'passConf':
                errors.passConf =
                    value !== document.getElementById('passW').value
                        ? 'Password must match password confirmation.'
                        : '';
                break;
            case 'secQuest':
                errors.secQuest =
                    value.length === 0
                        ? 'Please enter a security question.'
                        : '';
                break;
            case 'secAns':
                errors.secAns =
                    value.length === 0
                        ? 'Please enter a security answer.'
                        : '';
                break;
            default :
                break;
        }

        this.setState({errors, [name]: value});
    }


    // validity check for user inputs
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        this.validateField(name, value, errors);
    }

    //change state
    made() {
        // Inputs by user
        user = document.getElementById('userN').value;
        pass = document.getElementById('passW').value;
        pCon = document.getElementById('passC').value;
        ques = document.getElementById('q').value;
        answ = document.getElementById('ans').value;
        
        if (user.length > 0 && pass.length > 0 && pass === pCon && ques.length > 0 && answ.length > 0){
            axios.post(apiHost + ":5000/register",
            {
                username: user,
                password: pass,
                sec_question: ques,
                sec_answer: answ
            }).then(response => {
                if (response.data.success) {
                    this.props.history.push("/");
                }
                else {
                    let errors = this.state.errors;
                    errors.userName = response.data.message;
                    this.setState({errors});
                }
            })
        }
        else {
            let errors = this.state.errors;
            this.validateField('userName', user, errors);
            this.validateField('passWord', pass, errors);
            this.validateField('passConf', pCon, errors);
            this.validateField('secQuest', ques, errors);
            this.validateField('secAns', answ, errors);
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                <div style={styles.centerDiv}>
                    <img src={logo} style={{width: 100, height: 100}}/>
                    <h1>Create Account</h1>
                </div>

                <div className='userName' style={styles.centerDiv}>
                    <label>Username:&nbsp;</label>
                    <input type="text" name='userName' id="userN"
                        onChange={this.handleChange} />

                </div>

                <div className='passWord' style={styles.centerDiv}>
                    <label>Password:&nbsp;</label>
                    <input type="password" name='passWord' id="passW"
                        onChange={this.handleChange} />

                </div>

                <div className='passConf' style={styles.centerDiv}>
                    <label>Confirm Password:&nbsp;</label>
                    <input type="password" name='passConf' id="passC"
                        onChange={this.handleChange} />

                </div>

                <div className='secQuest' style={styles.centerDiv}>
                    <label>Security Question:&nbsp;</label>
                    <input type="text" name='secQuest' id="q"
                        onChange={this.handleChange} />

                </div>

                <div className='secAns' style={styles.centerDiv}>
                    <label>Security Question Answer:&nbsp;</label>
                    <input type="text" name='secAns' id="ans"
                        onChange={this.handleChange} />

                </div>

                <div style={styles.centerDiv}>
                    <button class= 'login_button' style={styles.allButton} onClick={this.made.bind(this)}>
                        Create Account
                    </button>
                    <a href="/">
                        <button class= 'login_button' style={styles.allButton}>
                            Go Back
                        </button>
                    </a>
                </div>

                {errors.userName.length > 0 &&
                    <div style={styles.centerDiv}>
                        <span className='error'>{errors.userName}</span>
                    </div>
                }

                {errors.passWord.length > 0 &&
                    <div style={styles.centerDiv}>
                        <span className='error'>{errors.passWord}</span>
                    </div>
                }

                {errors.passConf.length > 0 &&
                    <div style={styles.centerDiv}>
                        <span className='error'>{errors.passConf}</span>
                    </div>
                }

                {errors.secQuest.length > 0 &&
                    <div style={styles.centerDiv}>
                        <span className='error'>{errors.secQuest}</span>
                    </div>
                }

                {errors.secAns.length > 0 &&
                    <div style={styles.centerDiv}>
                        <span className='error'>{errors.secAns}</span>
                    </div>
                }
            </div>
        );
    }
}

const styles = {
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1em'
    },
    allButton: {
        height: 40,
        width: 175
    }
};

export default CreateAccount;
