import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import apiHost from './config';

/**
 * Props should be:
 * eventID
 */
class PlanEventButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            awaiting: true,
            renderPlanButton: false,
            eventIsPlanned: false,
            notFirstLoad: false,
            //created this variable so I can have a temp to store the increment value
            value:0,
            interestCount:0
        };
    }

    componentDidMount = () => {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.get(apiHost + ':5000/accountInfo', {
                headers: { Authorization: 'JWT ' + userToken } 
            }).then(response => {
                if (response.data.success) {
                    if (response.data.data.planned_events.includes(this.props.eventID)) {
                        this.setState({
                            awaiting: false,
                            renderPlanButton: true,
                            eventIsPlanned: true
                        });
                    }
                    else {
                        this.setState({
                            awaiting: false,
                            renderPlanButton: true,
                            eventIsPlanned: false
                        });
                    }
                }
            })
        }
        else {
            this.setState({
                awaiting: false,
                renderPlanButton: false
            });
        }

        this.handleInterestCount(this.state.eventIsPlanned, this.state.firstLoad);
    }

    planEvent() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ':5000/planEvent', {
                eventId: this.props.eventID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        eventIsPlanned: true,
                        notFirstLoad: true,
                    });
                    this.handleInterestCount(this.state.eventIsPlanned, this.state.firstLoad);
                }
            })
        }
    }

    unplanEvent() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ':5000/unplanEvent', {
                eventId: this.props.eventID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        eventIsPlanned: false,
                        notFirstLoad: true,
                    });
                    this.handleInterestCount(this.state.eventIsPlanned, this.state.firstLoad);
                }
            })
        }
    }

    notLoggedIn() {
        alert("Log In to Plan Events");
    }

    //used async because we need to get the data first
    handleInterestCount = async (eventIsPlanned, firstLoad) => {

        const data = await axios.get(apiHost + ':5000/getEvent',{
            params: {
                eventId: this.props.eventID
            },
        });

    
        this.setState({
            value: data.data.data.interestCount,
            interestCount: data.data.data.interestCount
        });

        // //this makes sure this runs only when the buttons have been pressed
        // if(this.state.notFirstLoad) {
        //     if(eventIsPlanned){
        //         this.setState({
        //             interestCount: this.state.value+1
        //         });
        //     }

        //     else {
        //         if(this.state.value > 0){
        //             this.setState({
        //                 interestCount: this.state.value-1
        //             });
        //         }
        //     }

            // const userToken = localStorage.getItem('jwtToken');
            // if (userToken !== null) {
            //     axios.post(apiHost + ':5000/incrementInterest', {
            //         eventId: this.props.eventID,
            //         interestCount: this.state.value
            //     }, {
            //         headers: { Authorization: 'JWT ' + userToken }
            //     }).then(response => {
            //         console.log(response);
            //         if (response.data.success) {
            //             this.setState({
            //                 interestCount: this.state.value
            //             });
            //         }
            //     }).catch(error => console.log(error));
            // }
        // } 
    }

    render() {
        if (this.state.awaiting) {
            return null;
        }
        else if (this.state.renderPlanButton) {
            if (this.state.eventIsPlanned) {
                // want to give option to unplan
                return (
                    <div className="w3-row">
                        <div className="w3-col m8 s12">
                            <p>
                                <button className={"button button1"} 
                                        onClick={() => this.unplanEvent()}
                                        style={{backgroundColor: "#b8b8b8"}}>
                                    Remove from Planned Events
                                </button>
                            </p>
                        </div>
                        <div className="w3-col m4 w3-hide-small">
                            <p>
                                <span className="w3-padding-large w3-right">
                                    <b>
                                        Interest Count  
                                    </b>
                                    <span className="w3-tag">
                                        {this.state.interestCount}
                                    </span>
                                </span>
                            </p>
                        </div>  
                    </div>
                ); 
            }
            else {
                // want to give option to plan
                return (
                    <div className="w3-row">
                        <div className="w3-col m8 s12">
                            <p>
                                <button className={"button button1"} 
                                        onClick={() => this.planEvent()}
                                        style={{backgroundColor: "#789ade"}}>
                                    Add to Planned Events
                                </button>
                            </p>
                        </div>
                        <div className="w3-col m4 w3-hide-small">
                            <p>
                                <span className="w3-padding-large w3-right">
                                    <b>
                                        Interest Count  
                                    </b>
                                    <span className="w3-tag">
                                        {this.state.interestCount}
                                    </span>
                                </span>
                            </p>
                        </div>  
                    </div>
                ); 
            }
        }
        else {
            return (
                <div className="w3-row">
                    <div className="w3-col m8 s12">
                        <p>
                            <button className={"button button1"} 
                                    onClick={() => this.notLoggedIn()}
                                    style={{backgroundColor: "#b8b8b8"}}>
                                Log In to Plan Events
                            </button>
                        </p>
                    </div>
                    <div className="w3-col m4 w3-hide-small">
                        <p>
                            <span className="w3-padding-large w3-right">
                                <b>
                                    Interest Count  
                                </b>
                                <span className="w3-tag">
                                    {this.state.interestCount}
                                </span>
                            </span>
                        </p>
                    </div>  
                </div>
            );
        }
    }
}

export default PlanEventButton;
