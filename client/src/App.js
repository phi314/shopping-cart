import React, { Component } from 'react';

import AppNavbar from './components/layouts/Navbar';
import ShoppingList from './components/ShoppingList';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <AppNavbar />
                    <ShoppingList />
                </React.Fragment>
            </Provider>
        );
    }
}

export default App;
