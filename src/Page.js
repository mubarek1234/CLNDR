import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import CalendarView from './CalendarView';
import NavBar from './NavBar';
import './styles/App.css';
import apiHost from './config'
import Root from './Root';
// this file render both NavBar and CalendarView whenever the routhe /calendar is called

const styles = {
  centerDiv: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  allButton: {
    height: 40, 
    width: 175
  }
}

class Page extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
        <NavBar/>
        <CalendarView/>
      </div>
    )
  }
}


export default Page
