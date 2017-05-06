/* @flow */
/*eslint-disable prefer-const */

import React from 'react';
import { connect } from 'react-redux';
import actionWrapper from 'redux-action-wrapper';

import * as actions from '../actions';

import { Text, View, TouchableHighlight } from 'react-native';

const layoutStyle = {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'stretch',
    alignContent: 'stretch',
    flexWrap:'wrap',
};

const itemStyle = {
    width: '50%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black'
};

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
    backgroundColor: 'black'
};

const valueStyle = {
    fontSize: 64,
    textAlign: 'center',
    fontVariant: ['lining-nums'],
    color: 'white'
};

const labelStyle = {
    fontSize: 18,
    textAlign: 'center',
    fontVariant: ['lining-nums'],
    color: 'white'
};

class Value extends React.Component {
    render () {
        return (<Text style={valueStyle}>
            {this.props.children}
        </Text>);
    }
}

class Label extends React.Component {
    render () {
        return (<Text style={labelStyle}>
            {this.props.children}
        </Text>);
    }
}



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
        return (<TouchableHighlight onPress={this.handlePress} style={itemStyle}>
            <View>
                <Label>Inning</Label>
                <Value>{topOrBottom} {displayNumber}</Value>
            </View>
        </TouchableHighlight>);
    }

}

class DataItem extends React.Component {
    handlePress = () => {
        this.props.increment(this.props.property);
    }

    render () {
        return (<TouchableHighlight onPress={this.handlePress} style={itemStyle}>
            <View>
                <Label>{this.props.property}</Label>
                <Value>{this.props.gameData[this.props.property]}</Value>
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
        return (<TouchableHighlight onPress={this.props.onPress} style={itemStyle}>
            <View><Label>{this.props.children}</Label></View>
        </TouchableHighlight>);
    }
}

class Layout extends React.Component {
    render() {
        return (<View style={layoutStyle}>
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="balls" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="strikes" />
            <Inning gameData={this.props.gameData} increment={this.props.actions.increment} />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="outs" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="away" />
            <DataItem gameData={this.props.gameData} increment={this.props.actions.increment} property="home" />
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
