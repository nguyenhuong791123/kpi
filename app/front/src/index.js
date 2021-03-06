import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import * as serviceWorker from './serviceWorker';

import Msg from './msg/Msg';
const client = new ApolloClient({ uri: Msg.getSystemMsg('graphql') });
console.log(client);

// "start": "PORT=8081 react-scripts start",
ReactDOM.render(
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
