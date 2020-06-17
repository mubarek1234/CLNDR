import React, { Component } from 'react';
import "./styles/App.css"
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";
import axios from "axios";
import { Timestamp } from '@google-cloud/firestore';
import apiHost from './config'
import moment from 'moment'

var hostId;

class EditEventPage extends Component {
    /*Well, in this context, we don't really need
    to create completely new ones, right? We should be
    getting it from the PREVIOUS one(probably not even
    using a constructor

    In spite of this though, EditAccountInfo.js seems to have
    a very nulled state in spite of this
    */
    constructor(props) {
        super(props)
	          this.state = {
        title:"",
        startDate:"",
        endDate:"",
        startTime:"",
        endTime:"",
        description:"",
        keywords:"",
        cohosts:"",
        //implements
        imageURL:"",
        userID: null,
        username: null,
        email: null,
        accountLevel: null,
        guest: true, //Will keep true for now

        // old details
        otitle:"",
        ostarttime:"",
        ostartdate:"",
        oenddate:"",
        oendtime:"",
        odescription:"",
        ohostid:"",
	okeywords:"",
	oimage:"",
	ocohosts:"",
	
	goodbye: "Delete Event"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    }

  /*Get Account Details*/
  
  /*  
    Is userToken is null, that means that it is definitely not logged in.

    But we won't need to check that. We'll strictly need to check if the
    user's accountLevel is set to null. Not being null means being a host
    (most likely; unless there is anything else that is missing)
  */
  componentDidMount = () =>{
    let userToken = localStorage.getItem('jwtToken'); 
	if (userToken === null) {
	 this.setState({
	        userID: "log in for this",
	    });
	}
	else {
    axios.get(apiHost + ':5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
      if(response.data.success){
      this.setState({
	  userID: response.data.id,
      });
      console.log(this.state.userID);
      }
      else{}
    })
    .catch(error => {
      console.log(error.data);
    });
  }

    //here
            const { handle } = this.props.match.params;
        axios.get(apiHost + ':5000/getEvent',{
            params: {
                eventId: this.props.match.params.id
            },
           
        }).then(response => {
            //for host that created the event
            //to check if user has used the 
            axios.get(apiHost + ':5000/userInfo',{
                params: {
                   userID: response.data.data.hostID
                },
            }).then(response =>{
                console.log(response);
                if(response.data.success){
                    if(response.data.data.org_name == null){
                        this.setState({
                            hostName: response.data.data.username
                        })
                    }
                    else{
                        this.setState({
                            hostName: response.data.data.org_name
                        })
                    }
                  }
                  else{
                  }
            })

        var theStartDate = new Date(response.data.data.start._seconds*1000);
        var theEndDate = new Date(response.data.data.end._seconds*1000);
        this.setState({
            otitle: response.data.data.eventName,
            ostartdate: moment(theStartDate).format('YYYY-MM-DD'),
            ostarttime: moment(theStartDate).format('HH:mm'),
            oenddate: moment(theEndDate).format('YYYY-MM-DD'),
            oendtime: moment(theEndDate).format('HH:mm'),
            odescription: response.data.data.eventDescription,
	          okeywords: response.data.data.eventKeywords,
            oimage: response.data.data.imageUrl,
            ocohosts: response.data.data.eventCohosts,
            ohostid: response.data.data.hostID
            })
        }).catch(error => {
            console.log("in componentDidMount");
            console.log(error.data);
        });
    //there
}

    handleInputChange(event) {
        this.setState({
		         [event.target.name]: event.target.value
        });
      }

    handleByeBye = () => {
        if(this.state.ohostid !== this.state.userID) {
          alert("You are not the host of this event")
        }
        else if(this.state.goodbye == "Delete Event"){
            this.setState({goodbye: "Confirm Delete Event"})
        }
        else if(this.state.goodbye == "Confirm Delete Event"){
            this.setState({goodbye: "Confirm Again"})
        }
        else {
            let userToken = localStorage.getItem('jwtToken');
            var place = this.props.match.params.id
            axios.post(apiHost + ':5000/deleteEvent', {
              eventId: place
            }, {
		          headers: { Authorization: 'JWT ' + userToken },
		        }).then(response => {
              if(response.data.success){
                
              }
            })

            alert("Event deleted!")
            this.props.history.push('/account')
            
        }

    }
    handleClick = () => {

      //check if user is host
      if(this.state.ohostid !== this.state.userID) {alert("You are not the host of this event")}










        let userToken = localStorage.getItem('jwtToken');
        /*-------------------Added Code--------------------*/
            axios.get(apiHost + ':5000/EventPages/',{
                params: { eventID: this.props.match.params.id }
                
            }).then(response => {
                if (response.data.success) {
                  var hostId = response.data.data.hostID;
                }
            });
        /*-------------------------------------------------*/

        //If null, verified, and has same hostID as the user's ID(which maps host to the event)
        /*To be used in the event that the hostID of the specific event to edit is found*/
        //if (userToken !== null && this.state.accountLevel !== null && this.state.userID === hostID) {

        //Assumes that accountLevel not being null makes it verified; may need to change the code
        //if that assumption is wrong
        //if (userToken !== null && hostId === this.state.userID){
        if (userToken !== null){
          /* CONTROLLER CALL */
          var title = this.state.title;
          var startDate = this.state.startDate;
          var startTime = this.state.startTime;
          var endDate = this.state.endDate;
          var endTime = this.state.endTime;
          var description = this.state.description;
          var keywords = this.state.keywords;
          var cohosts = this.state.cohosts;
          var imageUrl = this.state.imageURL;
          var hostID = this.state.userID;
          if(title.length === 0) { title = this.state.otitle }
          if(startDate.length === 0) { startDate = this.state.ostartdate }
          if(startTime.length === 0) { startTime = this.state.ostarttime }
          if(endDate.length === 0) { endDate = this.state.oenddate }
          if(endTime.length === 0) { endTime = this.state.oendtime }
          if(keywords.length === 0) { keywords = this.state.okeywords }
          if(cohosts.length === 0) { cohosts = this.state.ocohosts }
          if(imageUrl.length === 0) { imageUrl = this.state.oimage }
          if(description.length === 0) { description = this.state.odescription }


        /* make the server call, which will make the database call to add the new tutor to the tutors list */
        axios.post(apiHost + ':5000/updateEvent', { 
            title: title,
            hostID: hostID,
            startDate: startDate,
            startTime: startTime,
            eventId: this.props.match.params.id,
            endDate: endDate,
            endTime: endTime,
            description: description,
            keywords: keywords,
            cohosts: cohosts,
            imageUrl: imageUrl
        }, {
            headers: { Authorization: 'JWT ' + userToken }
        }).then(response => {
            if (response.data.success) {
                this.props.history.push("/eventpage/"+this.props.match.params.id);
            }
        }).catch(error => console.log(error));
        /* END OF CONTROLLER CALL */
      }
}


    render(){
        const {title, startDate, startTime, endDate, endTime, description, keywords, cohosts,imageURL} = this.state;

        return(
        <div>
            <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
		      <NavBar/>
		  <br />
            <h1 class="center ">Update Event</h1>
            <div class="center update-event-form">
          <h3>Only fill in the fields that you want changed</h3>
                <div class="form-input">
                    <label>Event Title:</label>
		     <input onChange={this.handleInputChange} type="text" name="title" id="title" placeholder="Event Title"/>
                </div>

                <div class="date-time-grid">
                    <label>Start Date:</label><label>Start Time:</label>
		       <input onChange={this.handleInputChange} name="startDate" type="date" id="start_date" /><input type="time" onChange={this.handleInputChange} name="startTime" id="start_time" />
                </div>

                <div class="date-time-grid">
                    <label>End Date:</label><label>End Time:</label>
		        <input onChange={this.handleInputChange} name="endDate" type="date" id="end_date" /><input type="time" onChange={this.handleInputChange} name="endTime" id="end_time" />
                </div>

                <div class="form-input">
                    <label>Details:</label>
		       <textarea onChange={this.handleInputChange} name="description" rows = "5" cols = "50" id="details" placeholder="Enter description here..."></textarea>
                </div>

                <div class="form-input">
                    <label>Keywords:</label>
		     <textarea onChange={this.handleInputChange} name="keywords" rows = "3" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Co-Hosts:</label>
		        <textarea onChange={this.handleInputChange} name="cohosts" rows = "1" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Picture</label>
		          <input onChange={this.handleInputChange} type="text" name="imageURL" id="title" placeholder="Image URL"/>
                </div>

                <br/><br/>
                <button style={styles.allButton} onClick={this.handleClick}>Submit</button>
                <a href={"/eventpage/"+this.props.match.params.id}>
                  <button style={styles.allButton}>
                    Go Back
                  </button>
                </a>
            </div>
          <div style={styles.centerDiv}>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

          <button style={styles.allButton} onClick = {() => this.handleByeBye()}>{this.state.goodbye}</button>
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
      alignItems: 'center'
    },
    allButton: {
      height: 40, 
      width: 100
    }
  };
  
export default EditEventPage;
