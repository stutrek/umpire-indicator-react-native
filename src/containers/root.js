/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';
import Layout from '../Components/Layout';

const store = configureStore();

class Root extends React.Component {
    render() {
        return (<Provider store={store}>
        	<Scene />
    	</Provider>);
    }
}

export default Root;
