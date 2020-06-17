import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import Page from './Page';
import axios from "axios";
import apiHost from './config'
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';


import firebase from './firebase'

var user;
var pass;


class App extends Component {
	constructor(props){
		super(props);

		const userToken = localStorage.getItem('jwtToken');
		if (userToken !== null) {
			axios.get(apiHost + ':5000/accountInfo', {
				headers: { Authorization: 'JWT ' + userToken },
			}).then(response => {
				if(response.data.success){
					this.props.history.push('/calendar');
				}
			});
		}

		this.state = {
			data: null,
			signin: false,
		};
	}

	handleLogin(){
		user = document.getElementById('userN').value;
		pass = document.getElementById( 'passW').value;
		if (user.length > 0 && pass.length > 0){
			axios.post(apiHost + ":5000/login",
			{
				username: user,
				password: pass
			}).then(response => {
                console.log(response)
                if (response.data.success) {
					this.setState({signin: true})
					const token = response.data.token;
					localStorage.setItem('jwtToken',token);
					this.props.history.push("/calendar");
                }
                else {
					alert("Invalid Username or Password");
                }
            });
        }
	}


	handleForgot(){
		user = document.getElementById('userN').value;
		if(user.length === 0){
			alert("Type your username in before selecting forgot password.")
		}
		else{
			this.props.history.push("/forgotPassword/" + user)
		}
	}

  	render() {
		return (
			<div style={{backgroundColor: '#d6f3ff', height: 1000}}>
				<div style= {styles.centerDiv}>
					<img src={logo} style= {{width: 100, height: 100}}/>
					<h1>CLNDR</h1>
				</div>

				<br />

				<div style= {styles.centerDiv}>
					<h3>Returning Member</h3>
				</div>

				<div style= {styles.centerDiv}>
					<label>Username &nbsp;</label>
					<input type="text" name='userName' id="userN"/>
				</div>

				<br />

				<div style= {styles.centerDiv}>
					<label>Password &nbsp;</label>
					<input type="password" name='passWord' id="passW"/>
				</div>

				<br />

				<div style= {styles.centerDiv}>
					<button class= 'login_button' style= {{width: 130}} onClick={() => this.handleLogin()}>
						Login
					</button>
			
					<button class= 'login_button' style= {{width: 130}} onClick={() => this.handleForgot()}>
						Forgot Password
					</button>
				</div>

				<br />
				<br />

				<div style= {styles.centerDiv}>
					<h3>Prospective Member</h3>	            
				</div>
				
				<div style= {styles.centerDiv}>
					<p>To enjoy full personalized benefits of CLNDR, sign up for an account.</p>
				</div>
				
				<div style= {styles.centerDiv}>
					<a href="/createaccount">
						<button class= 'login_button' style= {{width: 130}}>
							Create Account
						</button>
					</a>
				</div>

				<br />
				<br />

				<div style= {styles.centerDiv}>
					<h3>Guest</h3>
				</div>
				
				<div style= {styles.centerDiv}>
					<p>To simply explore scheduled events, continue as guest.</p>
				</div>
				<div style= {styles.centerDiv}>
					<a href="/calendar">
						<button class= 'login_button' style= {{width: 130}}>
							Continue as Guest
						</button>
					</a>
				</div>
				
				<br />
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

export default App;
