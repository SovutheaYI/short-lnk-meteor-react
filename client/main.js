import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { onAuthChange, routes } from '../imports/routes/routes';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId(); // get current user logged in
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(
        routes,
        document.getElementById('app')
    );
});