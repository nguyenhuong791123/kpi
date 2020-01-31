import React, { Component as C } from 'react';

import '../css/Footer.css';
// import { Query } from 'react-apollo';
// import { FEED_QUERY } from '../gql/User';

class Footer extends C {
    constructor(props) {
        super(props);

        this.state = { copyright: this.props.copyright }
    }

    render() {
        return (
            <div>
                <span>
                    { this.state.copyright }
                </span>
            </div>
        );

            // <Query query={FEED_QUERY}>
            //     {({ loading, error, data }) => {
            //         if (loading) return <div>Fetching</div>
            //         if (error) return <div>{ error }</div>
            //         if (data === null) return <div>Empty</div>

            //         console.log(data);
            //         var linksToRender = data.getUserInfos;
            //         console.log(linksToRender);
                
            //         return (
            //             <div>
            //                 { linksToRender.map(link => <div key={link.user_id} >{link.user_name}</div>) }
            //             </div>
            //         )
            //     }}
            // </Query>
        // );
    };
}

export default Footer;
