import React, {Component} from 'react';
import './styles/App.css';
import apiHost from './config'
class Users extends Component {
    render(){
        return(
            <div>
                <h1>Login</h1>

                <br />

                <h3>Returning Member</h3>
                <label>Username</label>
                <input />
                <br />
                <label>Password</label>
                <input />
                <br />
                <button>Login</button>
                <button>Forgot Password</button>

                <br />
                <br />
                <br />
                <h3>Prospective Member</h3>
                <p>To enjoy full personalized benefits of CLNDR, sign up for an account.</p>
                <button>Create Account</button>

                <br />
                <br />
                <br />
                <h3>Guest</h3>
                <p>To explore scheduled events without personalization, simply continue as guest.</p>
                <button>Continue as Guest</button>

            </div>
        );
    }
}

export default Users;