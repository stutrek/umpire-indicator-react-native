import React from 'react';

import { Text } from 'react-native';


const valueStyle = {
    fontSize: 64,
    textAlign: 'center',
    fontVariant: ['lining-nums'],
    color: 'white'
};

export default class Value extends React.Component {
    render () {
        return (<Text style={valueStyle}>
            {this.props.children}
        </Text>);
    }
}
