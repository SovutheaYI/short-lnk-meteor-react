import React from 'react';
import FlipMove from 'react-flip-move';
// import createHistory from 'history/createBrowserHistory';

import LinksList from './LinksList';

import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';
import LinksListFilter from './LinksListFilter';

// const browserHistory = createHistory();

export default class Link extends React.Component {
    render() {
        return (    
            <div>
                <PrivateHeader title="Your Link" />
                <div className="page-content">
                    <LinksListFilter/>
                    <AddLink/>
                    <LinksList/>
                </div>
            </div>
        );
    }
}


// Stateless Functional Component

// const Link = () => {
//     return (
//         <div>
//                 <PrivateHeader title="Short Lnk" />
//                 <LinksListFilter/>
//                 <AddLink/>
//                 <LinksList/>
//         </div>
//     );
// }

// export default Link;