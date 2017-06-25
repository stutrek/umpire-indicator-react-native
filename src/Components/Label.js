import React from 'react';
import { Text } from 'react-native';

const labelStyle = {
    fontSize: 18,
    textAlign: 'center',
    fontVariant: ['lining-nums'],
    color: 'white'
};

export default class Label extends React.Component {
    render () {
        return (<Text style={labelStyle}>
            {this.props.children}
        </Text>);
    }
}
