import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import apiHost from './config'

/**
 * Props should be:
 * eventID
 */
class EditEventButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userIsOwner: false
        }
    }

    componentDidMount = () => {
        // see if user is even logged in
        const userToken = localStorage.getItem('jwtToken');

        if (userToken !== null) {
            // logged in, so now check if they're owner
            axios.get(apiHost + ":5000/accountInfo", {
                headers: { Authorization: 'JWT ' + userToken },
            }).then(accInfoResponse => {
                if (accInfoResponse.data.success) {
                    axios.get(apiHost + ":5000/getEvent", {
                        params: {
                            eventId: this.props.eventID
                        }
                    }).then(getEventResponse => {
                        if (getEventResponse.data.success) {
                            if (getEventResponse.data.data.hostID === accInfoResponse.data.id) {
                                this.setState({
                                    userIsOwner: true
                                });
                            }
                        }
                    });
                }
            });
        }
    }

	render() {
        if (this.state.userIsOwner) {
            return (
                <a href={"/editeventpage/"+ this.props.eventID}>
                    <button style={{marginBottom: '1em'}} class='control_button'>
                        Edit Event
                    </button>
                </a>
            );
        }
        else {
            return null;
        }
    }
};

export default EditEventButton;
