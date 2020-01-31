import gql from 'graphql-tag';

export const FEED_QUERY = gql`
    {
        getUserInfos {
            user_id
            ,user_name
            ,user_email
        }
    }
`;
