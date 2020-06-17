import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import Root from './Root';
import axios from "axios";
import apiHost from './config'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            account: false,
            awaiting: true,
            username: "Guest",
		id: ""
        }
    }

    componentDidMount = () => {

        let userToken = localStorage.getItem('jwtToken');
        if (userToken == null) {
            console.log("NULLLLL");
        }
        axios.get(apiHost + ':5000/accountInfo', {
            headers: { Authorization: 'JWT ' + userToken },
        })
        .then(response => {
            
            if (response.data.success) {
                this.setState({ account: true, 
			verified: response.data.data.verified, 
			awaiting: false, 
			username: response.data.data.username,
			id: response.data.id
		});
            }
            else {
                this.setState({awaiting: false});
            }
        })
        .catch(error => {
            console.log(error.data);
            this.setState({awaiting: false});
        })

    }

    renderUsername() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderBottom: "0.5em solid white",
                fontSize: "1.25em"
            }}>
                Hello, {this.state.username}
            </div>
        );
    }

    render() {
        const ver = this.state.verified;
        const acc = this.state.account;
        const awaiting = this.state.awaiting;

        if (awaiting) {
            return (
                <div style={{ backgroundColor: '#d6f3ff' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <img src={logo} style={{ width: 100, height: 100 }} />
                        <h1 style={{ width: 500 }}>CLN<span className="goldText">DR</span></h1>
                        <input type="text" style={{ width: 180 }} />
                        <button style={{ width: 95 }}>Search</button>
                    </div>
                    <div style={{backgroundColor: "#004d6e", textAlign: "center" }}><button class="control_button" style={ {background: "transparent", border: "none",  height: 40, width: 175}}>
                        </button></div>
                    </div>
            );
        }

        //Renders if the user is a verified user
        if (ver) {
            return (

                <div style={{ backgroundColor: '#d6f3ff' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <img src={logo} style={{ width: 100, height: 100 }} />
                        <h1 style={{ width: 500 }}>CLN<span className="goldText">DR</span></h1>
                    </div>
                    
                    {this.renderUsername()}

                    <div style={{ backgroundColor: "#004d6e", textAlign: "center" }}>
                        <a href="/calendar">
                            <button class="control_button" style={styles.allButton}>
                                View Calendar
                        </button>
                        </a>
                        <a href="/planned">
                            <button class="control_button" style={styles.allButton}>
                                Planned Events
                        </button>
                        </a>
                        <a href="/following">
                            <button class="control_button" style={styles.allButton}>
                                Following
                        </button>
                        </a>
                        <a href="/account">
                            <button class="control_button" style={styles.allButton}>
                                Account
                        </button>
                        </a>
                        <a href="/createevent">
                            <button class="control_button" style={styles.allButton}>
                                Create Event
                        </button>
                        </a>
		    	                        <a href={"/hostpage/"+this.state.id}>
                            <button class="control_button" style={styles.allButton}>
                                Your Host Page
                        </button>
                        </a>
                    </div>
                    <br />
                </div>
            )
        }

        //Renders if the user has an account but is not verified
        else if (acc) {
            return (
                <div style={{ backgroundColor: '#d6f3ff' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <img src={logo} style={{ width: 100, height: 100 }} />
                        <h1 style={{ width: 500 }}>CLN<span className="goldText">DR</span></h1>
                    </div>

                    {this.renderUsername()}

                    <div style={{ backgroundColor: "#004d6e", textAlign: "center" }}>
                        <a href="/calendar">
                            <button class="control_button" style={styles.allButton}>
                                View Calendar
                        </button>
                        </a>
                        <a href="/planned">
                            <button class="control_button" style={styles.allButton}>
                                Planned Events
                        </button>
                        </a>
                        <a href="/following">
                            <button class="control_button" style={styles.allButton}>
                                Following
                        </button>
                        </a>
                        <a href="/account">
                            <button class="control_button" style={styles.allButton}>
                                Account
                        </button>
                        </a>
                    </div>
                    <br />
                </div>
            )
        }

        //Renders if the user does not have an account (is a guest) 
        else {
            return (
                <div style={{ backgroundColor: '#d6f3ff' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <img src={logo} style={{ width: 100, height: 100 }} />
                        <h1 style={{ width: 500 }}>CLN<span className="goldText">DR</span></h1>
                    </div>

                    {this.renderUsername()}
                    
                    <div style={{ backgroundColor: "#004d6e", textAlign: "center" }}>
                        <a href="/calendar">
                            <button class="control_button" style={styles.allButton}>
                                View Calendar
                        </button>
                        </a>
                        <a href="/account">
                            <button class="control_button" style={styles.allButton}>
                                Account
                        </button>
                        </a>
                        <a href="/">
                            <button class="control_button" style={styles.allButton}>
                                Log In
                        </button>
                        </a>
                    </div>
                    <br />
                </div>
            )
        }
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

export default NavBar
