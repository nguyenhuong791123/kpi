import React, { Component as C } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { sessionService, sessionReducer } from 'redux-react-session';
import { createBrowserHistory } from 'history';
import LoadingOverlay from 'react-loading-overlay';

import { ACTION } from './utils/Types';
import Reports from './pages/Reports';
// import Tables from './pages/Tables';
// import Charts from './pages/Charts';
import Footer from './pages/Footer';

import './css/bootstrap.min.css';
import './css/Index.css';

import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from './mode/Users';

let reducer = combineReducers({ session: sessionReducer });
let store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
sessionService.initSessionService(store, { driver: 'COOKIES' });
const history = createBrowserHistory();

class App extends C {
    constructor(props) {
        super(props);

        this._isLoading = this._isLoading.bind(this);

        this.state = {
            loading: true
            ,copyright: 'Copyright ©2018 VNEXT All Rights Reserved.'
            ,isUser: null
            ,items: {}
        }
    }

    _isLoading(loading) {
        this.state.loading = loading
        this.forceUpdate();
    }

    render() {
        console.log('APP Render !!!');
        // const { loading, error, data } = useQuery(GET_USERS);
        // console.log(error);

        return (
            <div>
                <LoadingOverlay active={ this.state.loading } spinner text='Loading your content...' />
                <Provider store={ store }>
                    <Router history={ history }>
                        {/* <div id='div_header'>
                            <Header isUser={ this.state.isUser } headers={ this.state['headers'] }/>
                        </div> */}
                        <div id='div_body'>
                            <Switch>
                                <Route
                                    exact path={ ACTION.SLASH }
                                    render={ ({ props }) => <Reports
                                                                isUser={ this.state.isUser }
                                                                isLoading={ this._isLoading.bind(this) }
                                                                {...this.props} />} />

                                {/* <Route
                                    exact path={  ACTION.SLASH + ACTION.TABLES }
                                    render={ ({ props }) => <Tables
                                                                isUser={ this.state.isUser }
                                                                items={ this.state.items }
                                                                isLoading={ this._isLoading.bind(this) }
                                                                {...this.props} />} />

                                <Route
                                    path={ ACTION.SLASH + ACTION.CHARTS }
                                    render={ ({ props }) => <Charts
                                                                isUser={ this.state.isUser }
                                                                items={ this.state.items }
                                                                isLoading={ this._isLoading.bind(this) }
                                                                {...this.props} />} /> */}
                            </Switch>
                        </div>
                    </Router>
                </Provider>

                <div id='div_footer' className='bg-light div-footer'>
                    <Footer copyright={ this.state.copyright } />
                </div>
            </div>
        );
    };
}

export default App;
