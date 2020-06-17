import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";
import './styles/App.css';
import NavBar from "./NavBar";
import apiHost from './config'

class Planned extends Component {
    constructor(props){
        super(props)
        //const userID = this.props.userID;
        console.log(this.props.match.params)
        this.state = {
            userID:"",
            events: []
        }
    }


    componentDidMount = async () => {
       
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            const data = await axios.get(apiHost + ':5000/accountInfo', {
                    headers: { Authorization: 'JWT ' + userToken },
                    })
                    .then(response => {
                    console.log(response);
                    if(response.data.success){
                    this.setState({
                          userID: response.data.id
                    })
                }
            }); 

            axios.get(apiHost + ":5000/planned",
            {
                params: {userID : this.state.userID},
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                console.log(response.data);
                if (response.data.success) {
                    console.log(response.data.data);
                    this.setState({
                        events: response.data.data
                    });
                }
            });
        }
    };

    static dateString(date) {
        return date.toLocaleString('default');
    }

    getUserID = async () =>{
    const userToken = localStorage.getItem('jwtToken');
    const data = await axios.get(apiHost + ':5000/accountInfo', {
            headers: { Authorization: 'JWT ' + userToken },
          })
          .then(response => {
            console.log(response);
            if(response.data.success){
            this.setState({
                  userID: response.data.id
            })
          }
        }); 
    }

    renderTableData(){
        return (
            <tbody>
            {this.state.events.map((event, index) => {
                const {id, name, hostName, description, start, end, hostID} = event;
                const startDate = Planned.dateString(new Date(start * 1000));
                const endDate = Planned.dateString(new Date(end * 1000));
                console.log(hostID);
                
                console.log(event);
                if(event != null){
                console.log("in hereee")
                return (
                    <tr class="events" key={id}>
                        <td><a href={'/eventpage/'+id}>{name}</a></td>
                        <td><a href={'/hostpage/'+hostID}>{hostName}</a></td>
                        <td>{startDate}</td>
                        <td>{endDate}</td>
                    </tr>
                )
               }
            })}
            </tbody>
        );
    }


    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>

                    <NavBar/>
                    <br />
                    <div class="events">
                        <div class = "events2">
                    <body>
                    <h2>Planned Events</h2>   
                    <div style={styles.centerDiv}>
                    <table class="events" id="events">
                        <th>Event Name</th>
                        <th>Host</th>
                        <th>Start Date/Time</th>
                        <th>End Date/Time</th>
                        {this.renderTableData()}
                    </table>
                    </div>

                    </body>
                    </div>
                    </div>
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

export default Planned
