import React, { Component } from 'react';
import './styles/App.css'
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";
import NavBar from "./NavBar"
import apiHost from './config'
class Following extends Component {

    constructor(props){
        super(props)
        const userID = this.props.userID;

        this.state = {
            userID: "user1",
            hostIDs: [],
            hostArray: [],
            userID:""
        }
    }

    componentDidMount = async () => {
        let userToken = localStorage.getItem('jwtToken');
        const data = await axios.get(apiHost + ':5000/accountInfo', {
            headers: { Authorization: 'JWT ' + userToken },
            })
            .then(response => {
            //console.log(response);
            if(response.data.success){
                this.setState({
                     userID: response.data.id
                })
            }
        }); 

        if (userToken !== null) {
            axios.get(apiHost + ":5000/following",
            {
                params: {userID : this.state.userID},
                headers: { Authorization: 'JWT ' + userToken },
            }).then(response => {
                if (response.data.success){
                    this.setState({
                        hostArray: response.data.data
                    })
                }
            });
        }
    };


    renderTableData() {
        return (
            <tbody>
                {this.state.hostArray.map((host, index) => {
                    const {id, org_name, username, contact_email} = host;
                    return (
                        <tr class="hosts" key={id}>
                            <td><a href={'/hostpage/'+id}>{org_name}</a></td>
                            <td>{username}</td>
                            <td>{contact_email}</td>
                        </tr>
                    );
                })}
            </tbody>
        )
    }


    render() {
        return (

            <div>

                <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>

                    <NavBar/>


                    <br />
                    <div className="events">
                        <div className="events2">

                            <body>

                            <h2>Followed Hosts</h2>

                            <div style={styles.centerDiv}>
                                <table class="host">
                                    <th>Host Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
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




export default Following;
