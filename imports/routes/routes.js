import { Meteor } from 'meteor/meteor';
import { Router, Route, Switch } from 'react-router';
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';

// routes component
import Signin from '../ui/Signin';
import Signup from '../ui/Signup';
import Notfound from '../ui/Notfound';
import Link from '../ui/Link';

const browserHistory = createBrowserHistory();


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links']

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links');
    }
}

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
}

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Signin} onEnter={onEnterPublicPage}/>
            <Route exact path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
            <Route exact path="/links" component={Link} onEnter={onEnterPrivatePage}/>
            <Route component={Notfound}/>
        </Switch>
    </Router>
);


export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;  // get current location
    const isAuthenticatedPages = authenticatedPages.includes(pathname); // check if it's authenticated pages
    const isUnauthenticatedPages = unauthenticatedPages.includes(pathname); // check if it's unauthenticated pages

    if (isAuthenticated && isUnauthenticatedPages) {
        browserHistory.replace('/links');
    } else if (!isAuthenticated && isAuthenticatedPages) {
        browserHistory.replace('/');
    }
    // if on unauthenticated pages and logged in, redirect to /links
    // if on authenticated pages and logged out, redirect to /
    // no else
}