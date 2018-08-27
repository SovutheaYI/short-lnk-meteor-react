import React from 'react';
import { Link } from 'react-router-dom';
import SimpleSchema from 'simpl-schema';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        try {
            new SimpleSchema({
                email: {
                    type: String,
                    regEx: SimpleSchema.RegEx.Email
                }
            }).validate({
                email
            });
        } catch(e) {
            throw new Meteor.Error(400, this.setState({error: e.message}));
        }

        Accounts.createUser({email, password}, (err) => {
            // console.log("Signup callback", err);
            if (err) {
                this.setState({
                    error: err.reason   // show up reason of errors
                });
            } else {
                this.setState({
                    error: ''
                });
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">

                    <h1>Join Short-Lnk</h1>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        <input type="text" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>

            </div>
        );
    }
}