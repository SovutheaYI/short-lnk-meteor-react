import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }


    // Run this second
    onSubmit = (e) => {
        const {url} = this.state;
        e.preventDefault();
        // Links.insert({ url: url, userId: Meteor.userId() });
        Meteor.call('insert_links', url, (err, res) => {
            if (!err) {
                this.setState({
                    isOpen: false,
                    error: '',
                    url: ''
                });
            } else {
                this.setState({
                    error: 'Url must be a valid URL (http://..)'
                });
            }
        });
    }

    // Run this first
    onChange = (e) => {
        this.setState({
            url: e.target.value
        });
    }

    componentWillMount() {
        Modal.setAppElement('body');    // to avoid warning by react-modal
    }
    

    render() {

        return (
            <div>
                <button className="button" onClick={() => {this.setState({isOpen: true})}}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel={"Add Link"}
                    onAfterOpen={() => {this.refs.url.focus()}}
                    onRequestClose={() => {this.setState({url: '', isOpen: false, error: ''})}}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view__modal"
                    >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit} className="boxed-view__form">
                        <input 
                            type="text"
                            ref="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange}
                    />
                    <button className="button">Add Link</button>
                    </form>
                    <button className="button button--cancel" onClick={() => {this.setState({url: '', isOpen: false, error: ''})}}>Cancel</button>
                </Modal>
            </div>
        );
    }
}