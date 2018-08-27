import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';


import { Links } from '../imports/api/links';

Meteor.startup(() => {

    // let momentNow = moment();
    // // console.log(momentNow.format('MMM Do, YYYY'));  // Aug 23rd, 2018   // h:mma = 1:30PM
    // console.log(momentNow.fromNow()); // a few minutes ago
    // console.log(momentNow.fromNow(true));   // a few minutes  

    WebApp.connectHandlers.use((req, res, next) => {

        // Request
        const id = req.url.slice(1);  // slice array    // return /example
        const linkSelect = Links.findOne({ _id: id });

        // Response
        if (linkSelect) {
            res.statusCode = 302;
            res.setHeader('Location', linkSelect.url);
            res.end(Meteor.call('tracker_link', id));   // Need to pass value into it
        } else {
            next();
        }
    });
});

