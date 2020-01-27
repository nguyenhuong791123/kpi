import { gql } from 'apollo-boost';

export const GET_USERS = gql`
    query users { id, username, email }
`;

export const VIEW_USERS = gql`
    query ($id: Int){
        getUserInfo(id: $id) { id, username, email }
    }
`;

export const ADD_USER = gql`
    mutation($username: String, $email: String, $job_title: String) {
        createUser (username: $username, email: $email)
    }
`;

export const EDIT_USER = gql`
    mutation($id: Int, $username: String, $email: String, $job_title: String) {
        updateUserInfo (id: $id, username: $username, email: $email)
    }
`;

export const DELETE_USER = gql`
    mutation($id: Int) {
        deleteUser(id: $id)
    }
`;
