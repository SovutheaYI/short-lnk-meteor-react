import React from 'react';

export default class PrivateHeader extends React.Component {

    onClick = () => {
        Accounts.logout();
        // browserHistory.push('/');
        // Redirect
    }

    render() {
        return (
            <div className="header">
                <div className="header--content">
                    <h2>{this.props.title}</h2>
                    <button className="button--link--text" onClick={this.onClick}>Logout</button>
                </div>
            </div>
        );
    }
}


// Stateless Functional Component

// onClick = () => {
//     Accounts.logout();
// }

// const PrivateHeader = (props) => {
//     return (
//         <div>
//             <h2>{props.title}</h2>
//             <button onClick={this.onClick}>Logout</button>
//         </div>
//     );
// }

// export default PrivateHeader;