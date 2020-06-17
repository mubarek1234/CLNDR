import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import apiHost from './config';

/**
 * Props should be:
 * hostID
 */
class FollowButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            awaiting: true,
            renderFollowButton: false,
            hostIsFollowed: false
        };
    }

    componentDidMount = () => {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.get(apiHost + ':5000/accountInfo', {
                headers: { Authorization: 'JWT ' + userToken } 
            }).then(response => {
                if (response.data.success) {
                    if (response.data.data.following.includes(this.props.hostID)) {
                        this.setState({
                            awaiting: false,
                            renderFollowButton: true,
                            hostIsFollowed: true
                        });
                    }
                    else {
                        this.setState({
                            awaiting: false,
                            renderFollowButton: true,
                            hostIsFollowed: false
                        });
                    }
                }
            })
        }
        else {
            this.setState({
                awaiting: false,
                renderFollowButton: false
            });
        }
    }

    followHost() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ":5000/follow", {
                hostId: this.props.hostID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        hostIsFollowed: true
                    });
                }
            });
        }
    }

    unfollowHost() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ":5000/unfollow", {
                hostId: this.props.hostID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        hostIsFollowed: false
                    });
                }
            });
        }
    }

    notLoggedIn() {
        alert("Log In to Follow Hosts");
    }

    render() {
        if (this.state.awaiting) {
            return null;
        }
        else if (this.state.renderFollowButton) {
            if (this.state.hostIsFollowed) {
                // want to give option to unfollow
                return (
                    <button className={"button button1"} 
                            onClick={() => this.unfollowHost()}
                            style={{backgroundColor: "#b8b8b8"}}>
                        Unfollow
                    </button>
                );
            }
            else {
                // want to give option to follow
                return (
                    <button className={"button button1"} 
                            onClick={() => this.followHost()}
                            style={{backgroundColor: "#789ade"}}>
                        Follow
                    </button>
                );
            }
        }
        else {
            return (
                <button className={"button button1"} 
                        onClick={() => this.notLoggedIn()}
                        style={{backgroundColor: "#b8b8b8"}}>
                    Log In to Follow Hosts
                </button>
            );
        }
    }
}

export default FollowButton;
