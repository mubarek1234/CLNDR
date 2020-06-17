import React, { Component } from 'react';
/*import "./styles/CreateEventButton.css";*/
import './styles/App.css';
import apiHost from './config'

class CreateEventButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            doRender: true
        };
    }

    componentDidMount() {
        // call fetch
        this.callBackendAPI().then(res => this.setState({ doRender: true /* res.isHost */ })).catch(err => console.log(err));
    }
    
    // TODO: we will have it send a request to the API, to check if we are host
    // if we are, then we will actually render something, otherwise no
    // TODO: Consider security vulnerability, it might be possible for someone to force the button to
    // render, we will need additional backend checks on event creation page to ensure non-hosts can't
    // actually create events
    callBackendAPI = async() => {
        const response = await fetch('/currentUserStatus');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    };

    render() {
        if (this.state.doRender) {
            return (
                <a class="create_event_button" href="createEvent">+ Create an Event</a>
            );
        }
        else {
            return null;
        }
    }
}

export default CreateEventButton;