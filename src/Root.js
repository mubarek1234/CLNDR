import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import apiHost from './config'
import App from "./App";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import CalendarView from "./CalendarView";
import Planned from "./Planned";
import Following from "./Following";
import Account from "./Account";
import CreateEvent from "./CreateEventPage"
import EditEventPage from "./EditEventPage";
import EditAccountInfo from "./EditAccountInfo";
import Page from "./Page";
import EventPage from "./EventPage";
import HostPage from "./HostPage";
import Verification from  "./Verification";

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route component={EventPage} path="/eventpage/:id"/>
                    <Route component={HostPage} path="/hostpage/:id"/>
                    <Route component={CreateAccount} path="/createaccount" />
                    <Route component={ForgotPassword} path="/forgotpassword/:id" />
                    <Route component={Page} path="/calendar" />
                    <Route component={Planned} path="/planned" />
                    <Route component={Following} path="/following" />
                    <Route component={Account} path="/account" />
                    <Route component={CreateEvent} path="/createevent" />
                    <Route component={EditAccountInfo} path="/editaccountinfo" />
                    <Route component={EditEventPage} path="/editeventpage/:id" />
                    <Route component={Verification} path="/verification" />
                    <Route component={App} path="/" />

                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default Root;
