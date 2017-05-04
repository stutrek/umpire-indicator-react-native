/* @flow */
/*eslint-disable prefer-const */

import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';

import { Text, ScrollView } from 'react-native';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchData());
    }
    render() {
        return (
            <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
        <Text>hi!</Text>
      </ScrollView>
            );
    }
}

App.defaultProps = {
    dispatch: () => {
    },
    isFetching: false,
    message: ''
};

export default connect((state) => ({
    isFetching: state.data.isFetching,
    message: state.data.message
}))(App);
