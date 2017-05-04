/* @flow */
/*eslint-disable prefer-const */

import React from 'react';
import { connect } from 'react-redux';
import actionWrapper from 'redux-action-wrapper';

import * as actions from '../actions';

import { Text, View } from 'react-native';

class Inning extends React.Component {
    handlePress = () => {
        this.props.increment('inning');
    }

    render () {
        var topOrBottom;
        var value = this.props.gameData.inning / 2;
        var displayNumber = Math.floor(value);

        if (displayNumber === value) {
            topOrBottom = 'top';
        } else {
            topOrBottom = 'bot';
        }
        return (<View onPress={this.handlePress}>
            <Text onPress={this.handlePress}>{this.props.gameData[this.props.property]}</Text>
            <Text onPress={this.handlePress}>{topOrBottom} {displayNumber}</Text>
        </View>);
    }

}

class DataItem extends React.Component {
    handlePress = () => {
        this.props.increment(this.props.property);
    }

    render () {
        return (<View onPress={this.handlePress}>
            <Text onPress={this.handlePress}>{this.props.gameData[this.props.property]}</Text>
            <Text onPress={this.handlePress}>{this.props.property}</Text>
        </View>);
    }
}

class Layout extends React.Component {
    render() {
        return (<View>
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="balls" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="strikes" />
            <Inning gameData={this.props.gameData} increment={this.props.actions.increment} />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="outs" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="away" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="home" />
        </View>);
    }
}

function mapStoreToProps (store) {
    return {
        gameData: store.data.gameData,
        undos: store.data.undos.size
    };
}

function mapDispatchToProps (dispatch) {
    return actionWrapper({
        actions
    }, dispatch);
}

export default connect(mapStoreToProps, mapDispatchToProps)(Layout);
