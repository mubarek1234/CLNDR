import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import CalendarView from './routes/CalendarView';
import Account from './routes/Account';
import CreateEventPage from './routes/CreateEventPage';
import Following from './routes/Following';
import Planned from './routes/Planned';
import EventPage from './routes/EventPage';
import HostPage from './routes/HostPage';
import apiHost from './config'
// This file contains the main page of the app that allows the user
// to navigate to all the other pages

class Page extends Component {
    constructor(props) {
    	super(props);
		this.state = {
			page: 'calendarV'
		};
    }
	
	// switch case statement that determines which 
	// component to render depending on the state
	change() { 
		switch(this.state.page) {
			case 'calendarV': return <CalendarView initialReferenceDate={new Date()} />;
			case 'planned': return <Planned/>;
			case 'following': return <Following/>;
			case 'account': return <Account />;
			case 'create': return <CreateEventPage />;
			default: return <CalendarView initialReferenceDate= {new Date()} />;
		}
	}
	// render calendar view
	setCal() {
		this.setState({
			page: 'calendarV'
		})
	}
	// render planned events
	setPla() {
		this.setState({
			page: 'planned'
		})
	}
	// render following
	setFol() {
		this.setState({
			page: 'following'
		})
	}
	// render account
	setAcc() {
		this.setState({
			page: 'account'
		})
	}
	// render create event page
	cEvent() {
		this.setState({
			page: 'create'
		})
	}

   render() {
		return (
			<div style={{backgroundColor: '#cccccc', height: 1500}}>
				<div style= {styles.centerDiv}>
					<img src={logo} style= {{width: 100, height: 100}}/>
					<h1 style={{width: 500}}>CLNDR</h1>
					<input type= "text" style= {{width: 180}}/>
					<button style= {{width: 95}}>Search</button>
				</div>
				<div style= {styles.centerDiv}>
					<button style= {styles.allButton} onClick= {this.setCal.bind(this)}>View Calendar</button>
					<button style= {styles.allButton} onClick= {this.setPla.bind(this)}>Planned Events</button>
					<button style= {styles.allButton}onClick= {this.setFol.bind(this)}>Following</button>
					<button style= {styles.allButton}onClick= {this.setAcc.bind(this)}>Account</button>
					<button style= {styles.allButton}onClick= {this.cEvent.bind(this)}>Create Event</button>
				</div>
				<br />
				<div style= {styles.centerDiv}>
					{this.change()}
				</div>
			</div>
   	)
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
		width: 200
	}
};

export default Page
