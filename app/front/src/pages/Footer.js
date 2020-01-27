import React, { Component as C } from 'react';

import '../css/Footer.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo'

const FEED_QUERY = gql`
  {
    users {
      id
      ,username
    }
  }
`;

// const users = 

class Footer extends C {
    constructor(props) {
        super(props);

        this.state = { copyright: this.props.copyright }
    }

    render() {
        // const { loading, error, data } = useQuery(GET_DOGS);
        return (
        //     <div>
        //         <span>
        //             { this.state.copyright }
        //         </span>
        //     </div>
        // );

            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    if (data === null) return <div>Empty</div>

                    console.log(data);
                    var linksToRender = data.users;
                    console.log(linksToRender.length);
                
                    return (
                        <div>
                            { linksToRender.map(link => <div key={link.id} >{link.username}</div>) }
                        </div>
                    )
                }}
            </Query>
        );
    };
}

export default Footer;
