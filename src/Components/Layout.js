/* @flow */
/*eslint-disable prefer-const */

import React from 'react';
import { connect } from 'react-redux';
import actionWrapper from 'redux-action-wrapper';

import * as actions from '../actions';

import DataItem from './DataItem';
import Label from './Label';
import Value from './Value';

import { View, TouchableHighlight, Dimensions } from 'react-native';

const layoutStyle = {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'stretch',
    alignContent: 'stretch',
    flexWrap:'wrap',
};

const getItemStyle = (height) => { return {
    width: '50%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    height
};};

const multiItemStyle = {
    // flexDirection: 'column',
    // alignItems: 'stretch',
    // alignContent: 'stretch',
    width: '50%',
    justifyContent: 'center'
};

const multiItemChildStyle = {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    height: 105
};

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
        return (<TouchableHighlight onPress={this.handlePress} style={this.props.style}>
            <View>
                <Label>Inning</Label>
                <Value>{topOrBottom} {displayNumber}</Value>
            </View>
        </TouchableHighlight>);
    }

}


class MultiItemContainer extends React.Component {
    render () {
        return (<View style={multiItemStyle}>
            {this.props.children}
        </View>);
    }
}

class NoValue extends React.Component {
    render () {
        return (<TouchableHighlight onPress={this.props.onPress} style={getItemStyle()}>
            <View><Label>{this.props.children}</Label></View>
        </TouchableHighlight>);
    }
}

class Layout extends React.Component {

    render() {

        var { height } = Dimensions.get('window');

        var availableHeight = height - multiItemStyle.height - 20;
        var itemHeight = availableHeight / 3;

        let itemStyle = getItemStyle(itemHeight);

        return (<View style={layoutStyle}>
            <DataItem
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                property="balls"
                style={itemStyle}
            />
            <DataItem
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                property="strikes"
                style={itemStyle}
            />
            <Inning
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                style={itemStyle}
            />
            <DataItem
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                property="outs"
                style={itemStyle}
            />
            <DataItem
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                property="away"
                style={itemStyle}
            />
            <DataItem
                gameData={this.props.gameData}
                increment={this.props.actions.increment}
                property="home"
                style={itemStyle}
            />
            <MultiItemContainer>
                <TouchableHighlight onPress={this.props.actions.newGame} style={multiItemChildStyle}>
                    <View><Label>New Game</Label></View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.actions.undo} style={multiItemChildStyle}>
                    <View><Label>Undo</Label></View>
                </TouchableHighlight>
            </MultiItemContainer>
            <NoValue onPress={this.props.actions.nextBatter}>Next Batter</NoValue>

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
