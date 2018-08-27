import React from 'react';
import Clipboard from 'clipboard';
import { moment } from 'meteor/momentjs:moment';

export default class LinksListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            val: false,
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ val: true });
            setTimeout(() => this.setState({ val: false }), 1000);
        }).on('error', () => {
            alert('Error happened, manually copy!');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    setDate = () => {
        const msg = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let msgTime = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            msgTime = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return <p className="item__msg">{this.props.visitedCount} {msg} {msgTime}</p>
    }

    render() {
        return (
            <div className="items">
                <h2>{this.props.url}</h2>
                <p className="item__msg">{this.props.shortUrl}</p>
                {/* <p>{this.props.visible.toString()}</p> */}
                {this.setDate()}

                <a className="button button--pill button--link" target="_blank" href={this.props.shortUrl}>
                    Visit
                </a>

                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.val ? 'Copied' : 'Copy'}
                </button>

                <button
                    className="button button--pill" 
                    onClick={() => {Meteor.call('link_visible', this.props._id, !this.props.visible)}}
                >
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>

            </div>
        );
    }
}