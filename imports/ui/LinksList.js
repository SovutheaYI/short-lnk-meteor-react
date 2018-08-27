import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';


export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    };
    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({visible: Session.get('showVisible')}).fetch();
            this.setState({links: links})
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems = () => {
        if (this.state.links.length === 0) {
            return (
                <div className="items">
                    <p className="items__empty__msg">No Links found</p>
                </div>
            );
        }
        return this.state.links.map((res) => {
            const shortUrl = Meteor.absoluteUrl(res._id);   // return localhost:3000/_id
            return <LinksListItem key={res._id} shortUrl={shortUrl} {...res} />;   // Pass the whole object into Component
            // return <p key={res._id}>{res.url}</p>
        });
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}