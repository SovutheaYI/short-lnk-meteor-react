import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';


export default class Signin extends React.Component {

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
        
        Meteor.loginWithPassword({email}, password, (err) => {
            // console.log("Login callback", err);
            if (err) {
                this.setState({
                    // error: 'Unable to login. Check your Email/Username & Password!'
                    error: err.reason
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
                    <h1>Short Lnk</h1>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        <input type="text" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">No account yet?</Link>
                </div>
            </div>
        );
    }
}