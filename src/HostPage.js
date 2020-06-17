import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import Account from "./Account";
import moment from 'moment'
import NavBar from './NavBar';
import apiHost from './config'
import FollowButton from './FollowButton';

class HostPage extends Component {
    constructor(props) {
        super(props);


        const hostID = this.props.hostID;
        console.log(this.props.match.params)

        this.state = {
            viewForm: false,
            hostID: "",
            hostName: "",
            hostEmail:"",
            image:"",	
            hostedEventsList: [],
            events: []

        };
    }

    componentDidMount = () => {
        //hostedEventsList: response.data.hostedEventsList,
        let userToken = localStorage.getItem('jwtToken');
            axios.get(apiHost + ':5000/userInfo',{
                params: {
                   userID: this.props.match.params.id
                },
            }).then(response => {
                axios.get(apiHost + ':5000/eventsForHost',{
                    params: {
                        hostID: this.props.match.params.id
                    }
                }).then(response => {
                    if(response.data.success){
                    this.setState({
                        hostId: this.props.match.params.id,
                        hostedEventsList: response.data.data
                    }) 
                    }
                })
                console.log(response);
                console.log(response.data.data.org_name);
                if(response.data.success){
                    if(response.data.data.org_name != null){
                        this.setState({
                            hostName: response.data.data.org_name,
                            hostEmail: response.data.data.contact_email,
                            image: response.data.data.profile_pic_url
                    })
                }
                else{
                    this.setState({
                        hostName: response.data.data.username,
                        hostEmail: response.data.data.contact_email,
                })
                }
            }
        });
    }

    renderTableData(){
        return (
        <tbody>
        {this.state.hostedEventsList.map((event, index) => {
            const {id, eventName, hostName, start, end} = event
            var theStartDate = moment(new Date(start*1000)).format('LLL');
            var theEndDate = moment(new Date(end*1000)).format('LLL');
            return (
                <tr class="events" key={id}>
                    <td><a href={'/eventpage/'+id}>{eventName}</a></td>
                    <td>{theStartDate}</td>
                    <td>{theEndDate}</td>
                </tr>
            )
        })}
        </tbody>
        );
    }


    render() {
        return (
            <div>
                <NavBar/>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h1>{this.state.hostName}</h1>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={this.state.image} class="centerImage" height="200"/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3>Email: {this.state.hostEmail}</h3>
                </div>
                <div value="withConfirm" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FollowButton hostID={this.props.match.params.id} />
                </div>
                <br />

                <h2 style={{textAlign: "center"}}>{this.state.hostName}'s Events</h2>
                <div class="events" style={styles.centerDiv}>
                    <table class="events" id="events">
                        <th>Event Name</th>
                        <th>Start Date/Time</th>
                        <th>End Date/Time</th>
                        {this.renderTableData()}
                    </table>
                </div>
            </div>
            );
    }
}

const styles = {
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2em'
    },
    allButton: {
        height: 40,
        width: 175
    }
};
Account.defaultProps = {hostID: new String}

export default HostPage;
