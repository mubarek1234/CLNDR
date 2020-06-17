import React, { Component } from 'react';
import CreateEventButton from './CreateEventButton';
import "./styles/CalendarView.css";
import logo from './img/Logo-Semitransparent.png';
import axios from "axios";
import apiHost from './config'
const maxEvents = 10;
const linkEvents = true;
const moreEventsLink = false;

var emptyArrayOfArrays = [];
for (var i = 0; i < 31; i++) {
    emptyArrayOfArrays.push([]);
}

/** A Calendar. Pass the following props:
 * "referenceDate" is usually the current date, this component will use the reference date to 
 * determine what month to render and get events for.
 */
class CalendarView extends Component {
    constructor(props) {
        super(props);

        // create some test data
        var testArray = []
        for (var i = 0; i < 31; i++) {
            testArray.push([{name: "Event 1 on day " + i, id: (i * 2)}, {name: "Test2!", id: ((i * 2) + 1)}]);
        }

        var eventsDict = {};
        
        this.state = {
            eventsDict: eventsDict,
            referenceDate: this.props.initialReferenceDate,
            viewWeek: false
        };
    }

    incrementView() {
        var copyOfRef = new Date(this.state.referenceDate);

        if (this.state.viewWeek) {
            copyOfRef.setDate(copyOfRef.getDate() + 7);
        }
        else {
            copyOfRef.setMonth(copyOfRef.getMonth() + 1);
        }
        
        this.setState({
            referenceDate: copyOfRef
        });
    }

    decrementView() {
        var copyOfRef = new Date(this.state.referenceDate);
        
        if (this.state.viewWeek) {
            copyOfRef.setDate(copyOfRef.getDate() - 7);
        }
        else {
            copyOfRef.setMonth(copyOfRef.getMonth() - 1);
        }

        this.setState({
            referenceDate: copyOfRef
        });
    }

    getEventsForMonth(month, year) {
        axios.post(apiHost + ":5000/eventsForMonth", {
            month: month + 1,
            year: year
        }).then(response => {
            if (response.data.success) {
                var dictState = this.state.eventsDict;
                const identifier = CalendarView.getMonthIdentifier(new Date(year, month, 1));
                console.log(response.data.data);
                dictState[identifier] = response.data.data;
                this.setState({eventsDict: dictState});
            }
        });
    }

    eventsUndefined(date) {
        return this.state.eventsDict[CalendarView.getMonthIdentifier(date)] === undefined;
    }

    viewMonth() {
        this.setState({
            viewWeek: false
        });
    }

    viewWeek() {
        this.setState({
            viewWeek: true
        });
    }

    static getMonthIdentifier(date) {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    calendarHeading(header) {
        return (
            <div class="calendar_heading">
                <span class="button_box left_justify">
                    <a class="control_button" href="#" onClick={this.decrementView.bind(this)}>{"<"}</a>
                    <a class="control_button" href="#" onClick={this.incrementView.bind(this)}>{">"}</a>
                </span>
                <span class="calendar_heading_text">{header}</span>
                <span class="button_box right_justify">
                    <span class="view_text">View:</span>
                    <a class="control_button" href="#" onClick={this.viewMonth.bind(this)}>Month</a>
                    <a class="control_button" href="#" onClick={this.viewWeek.bind(this)}>Week</a>
                </span>
            </div>
        );
    }

    render() {
        // get the beginning and end of the month and weekdays so
        // we can properly align and bound the calendar cells
        const begOfMonth = new Date(this.state.referenceDate.getFullYear(), 
                                    this.state.referenceDate.getMonth(), 1);
        const endOfMonth = new Date(this.state.referenceDate.getFullYear(), 
                                    this.state.referenceDate.getMonth() + 1, 0);
        const weekdayOfStart = begOfMonth.getDay();
        const weekdayAfterEnd = endOfMonth.getDay() + 1;

        
        if (this.state.viewWeek == false) {        
            // generate a header
            const header = CalendarView.getMonthIdentifier(begOfMonth);

            // grab the list of events from the current month
            var events = this.state.eventsDict[header];

            if (events === undefined) {
                this.getEventsForMonth(begOfMonth.getMonth(), begOfMonth.getFullYear());
                events = emptyArrayOfArrays;
            }

            // Here, we have a row for the weekday headings. Then, we know each month will occupy 
            // at least 4 weeks, so do those unconditionally. Then, for the last 2 weeks a month 
            // could potentially occupy, only render them conditionally.
            return (
                <div class="calendar">
                    {this.calendarHeading(header)}
                    <table>
                        <tr class="weekdays">
                            <td>Sunday</td>
                            <td>Monday</td>
                            <td>Tuesday</td>
                            <td>Wednesday</td>
                            <td>Thursday</td>
                            <td>Friday</td>
                            <td>Saturday</td>
                        </tr>
                        <CalendarRow rowStart={weekdayOfStart} rowEnd={7} arrayStart={0} day={1} 
                          events={events} maxEvents={maxEvents} linkEvents={linkEvents} 
                          moreEventsLink={moreEventsLink} beginningOfPeriod={begOfMonth}/>
                        
                        <CalendarRow rowStart={0} rowEnd={7} arrayStart={7 - weekdayOfStart} 
                          day={7 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} 
                          linkEvents={linkEvents} moreEventsLink={moreEventsLink} 
                          beginningOfPeriod={begOfMonth}/>
                        
                        <CalendarRow rowStart={0} rowEnd={7} arrayStart={14 - weekdayOfStart} 
                          day={14 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} 
                          linkEvents={linkEvents} moreEventsLink={moreEventsLink} 
                          beginningOfPeriod={begOfMonth}/>
                        
                        <CalendarRow rowStart={0} rowEnd={7} arrayStart={21 - weekdayOfStart} 
                          day={21 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} 
                          linkEvents={linkEvents} moreEventsLink={moreEventsLink} 
                          beginningOfPeriod={begOfMonth}/>
                        
                        {(28 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                            <CalendarRow rowStart={0} rowEnd={((35 - weekdayOfStart + 1) 
                              <= endOfMonth.getDate()) ? 7 : weekdayAfterEnd} arrayStart={28 - weekdayOfStart} 
                              day={28 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} 
                              linkEvents={linkEvents} moreEventsLink={moreEventsLink} 
                              beginningOfPeriod={begOfMonth}/>
                        }

                        {(35 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                            <CalendarRow rowStart={0} rowEnd={weekdayAfterEnd} arrayStart={35 - weekdayOfStart} 
                            day={35 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} 
                            linkEvents={linkEvents} moreEventsLink={moreEventsLink} 
                            beginningOfPeriod={begOfMonth}/>
                        }
                        
                    </table>
                </div>
            );
        }
        else {
            const weekdayOfRef = this.state.referenceDate.getDay();
            const beginningOfWeek = new Date(this.state.referenceDate.getFullYear(), 
                                    this.state.referenceDate.getMonth(), 
                                    this.state.referenceDate.getDate() - weekdayOfRef);
            const endOfWeek = new Date(beginningOfWeek.getFullYear(), 
                                       beginningOfWeek.getMonth(), 
                                       beginningOfWeek.getDate() + 6);

            // build the list of events for the week and generate header
            var header = "";
            var events = [];
            if (beginningOfWeek.getMonth() != endOfWeek.getMonth()) {
                // generate header based on which month occupies the majority
                const beginningOfWeekHeader = CalendarView.getMonthIdentifier(beginningOfWeek);
                const endOfWeekHeader = CalendarView.getMonthIdentifier(endOfWeek);
                header = (endOfWeek.getDate() >= 4) ? endOfWeekHeader : beginningOfWeekHeader;

                const begMonthEvents = this.state.eventsDict[beginningOfWeekHeader];
                const endMonthEvents = this.state.eventsDict[endOfWeekHeader];

                if (begMonthEvents === undefined) {
                    this.getEventsForMonth(beginningOfWeek.getMonth(), beginningOfWeek.getFullYear());

                    for (var i = beginningOfWeek.getDate() - 1; 
                    i < beginningOfWeek.getDate() + 6 - endOfWeek.getDate(); i++) {
                        events.push([]);
                    }
                }
                else {
                    for (var i = beginningOfWeek.getDate() - 1; 
                    i < beginningOfWeek.getDate() + 6 - endOfWeek.getDate(); i++) {
                        events.push(begMonthEvents[i]);
                    }
                }

                if (endMonthEvents === undefined) {
                    this.getEventsForMonth(endOfWeek.getMonth(), endOfWeek.getFullYear());

                    for (var i = 0; i < endOfWeek.getDate(); i++) {
                        events.push([]);
                    }
                }
                else {
                    for (var i = 0; i < endOfWeek.getDate(); i++) {
                        events.push(endMonthEvents[i]);
                    }
                }
            }
            else {
                // generate the header
                header = CalendarView.getMonthIdentifier(beginningOfWeek);

                // grab the list of events from the current month
                const monthEvents = this.state.eventsDict[header];

                if (monthEvents === undefined) {
                    this.getEventsForMonth(beginningOfWeek.getMonth(), beginningOfWeek.getFullYear());
                    for (var i = 0; i < 7; i++) {
                        events.push([]);
                    }
                }
                else {
                    for (var i = beginningOfWeek.getDate() - 1; i < endOfWeek.getDate(); i++) {
                        events.push(monthEvents[i]);
                    }
                }
            }         
            
            return (
                <div class="calendar">
                    {this.calendarHeading(header)}
                    <table>
                        <tr class="weekdays">
                            <td>Sunday</td>
                            <td>Monday</td>
                            <td>Tuesday</td>
                            <td>Wednesday</td>
                            <td>Thursday</td>
                            <td>Friday</td>
                            <td>Saturday</td>
                        </tr>
                        <CalendarRow rowStart={0} rowEnd={7} arrayStart={0} 
                                     day={beginningOfWeek.getDate()} events={events} 
                                     maxEvents={maxEvents} linkEvents={linkEvents} 
                                     moreEventsLink={moreEventsLink} 
                                     beginningOfPeriod={beginningOfWeek} viewWeek={true}/>
                    </table>
                </div>
            );
        }
    }
}

/** A row of 7 cells. Pass the following props (all except "day" are 0 based):
 * "rowStart" to specify at what cell the numbering starts
 * "rowEnd" to specify at what cell the numbering ends
 * "arrayStart" to specify the index into the events array where we should start pulling events
 * "day" to specify what day of the month we start numbering this row from (1 based)
 * "key" is the array of events for the whole month
 * "maxEvents" is the max number of events to display per day, -1 for no limit
 * "linkEvents" whether to make each event a link or just plain text
 * "moreEventsLink" if we have a max number of events, controls whether or not we want to show a "more events" link
 * "beginningOfPeriod" used as a reference to the beginning of the calendar itself (what is being viewed)
 * "viewWeek" specified to style long or normal cells
 */
class CalendarRow extends Component {
    constructor(props) {
        super(props);
    }

    calculateDate(index) {
        if (this.props.viewWeek) {
            const endOfMonth = new Date(this.props.beginningOfPeriod.getFullYear(), 
                                        this.props.beginningOfPeriod.getMonth() + 1, 0);
            return ((index + this.props.day - this.props.rowStart - 1) % (endOfMonth.getDate())) + 1;
        }
        else {
            return (index + this.props.day - this.props.rowStart);
        }
    }

    render() {
        // pick the events that we will use in this row
        var eventsArray = [];
        for (var i = 0; i < 7; i++) {
            // we copy the events from the events prop iff rowStart <= i < rowEnd, otherwise push an empty array
            if (i >= this.props.rowStart && i < this.props.rowEnd) {
                eventsArray.push(this.props.events[this.props.arrayStart + (i - this.props.rowStart)]);
            }
            else {
                eventsArray.push([]);
            }
        }

        // now, render
        return (

            <tr class="calendar_row">
                {
                    // form the cells by mapping the events array (from state, not props, so it is the one with 7 elements)
                    eventsArray.map((item, index) => {
                        if (index < this.props.rowStart || index >= this.props.rowEnd) {
                            // empty cell if we are before rowStart or at or after rowEnd
                            return <td></td>;
                        }
                        else {
                            // otherwise, we put the current day, and map all events taking place that day to divs
                            return <td class={(this.props.viewWeek) ? "calendar-cell-long" : "calendar-cell"}>
                                   <div class="date">{this.calculateDate(index)}</div>{
                                item.map((event, index) => {
                                    if (this.props.maxEvents === -1 || index < this.props.maxEvents) {
                                        if (this.props.linkEvents) {
                                            return (
                                                <div class="event">
                                                    <a href={"/eventpage/" + event.id}>{event.name}</a>
                                                    {this.props.viewWeek &&
                                                        <div class="description">{event.description}</div>
                                                    }
                                                </div>
                                            );
                                        }
                                        else {
                                            return (
                                                <div class="event">
                                                    <span>{event.name}</span>
                                                    {this.props.viewWeek &&
                                                        <div class="description">{event.description}</div>
                                                    }
                                                </div>
                                            );
                                        }
                                    }
                                    else {
                                        return null;
                                    }
                                })
                            }
                            {this.props.maxEvents !== -1 && item.length > this.props.maxEvents && this.props.moreEventsLink &&
                                <a class="bold" href={"/viewEvents?year=" + this.props.beginningOfPeriod.toLocaleString('default', 
                                                     { year: 'numeric'}) + "&month=" + this.props.beginningOfPeriod.toLocaleString('default', 
                                                     { month: 'numeric'}) + "&day=" + this.calculateDate(index)}>View All></a>
                            }
                            </td>;
                        }
                    })
                }
            </tr>

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
      width: 175
    }
  };
CalendarRow.defaultProps = {
    maxEvents: maxEvents,
    linkEvents: linkEvents,
    moreEventsLink: moreEventsLink,
    viewWeek: false
};
CalendarView.defaultProps = {initialReferenceDate: new Date()};
export default CalendarView;
