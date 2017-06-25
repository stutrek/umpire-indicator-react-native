import React from 'react';

import { View, TouchableHighlight } from 'react-native';

import Label from './Label';
import Value from './Value';

export default class DataItem extends React.Component {
    handlePress = () => {
        this.props.increment(this.props.property);
    }

    render () {
        return (<TouchableHighlight onPress={this.handlePress} style={this.props.style}>
            <View>
                <Label>{this.props.property}</Label>
                <Value>{this.props.gameData[this.props.property]}</Value>
            </View>
        </TouchableHighlight>);
    }
}
