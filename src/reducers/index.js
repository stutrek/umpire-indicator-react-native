/* @flow */

import { combineReducers } from 'redux';
import {
    INCREMENT,
    NEXT_BATTER,
    NEW_GAME,
    UNDO
} from '../actions';

import { Record, List } from 'immutable';

const GameData = Record({
    balls: 0,
    strikes: 0,
    inning: 2,
    outs: 0,
    away: 0,
    home: 0,
});

const State = Record({
    gameData: new GameData(),
    undos: new List()
});

const initialState = new State();

function resetBatter (gameData) {
    return gameData
    .set('balls', 0)
    .set('strikes', 0);
}

function correctIncrement (gameData) {
    if (gameData.balls > 3) {
        gameData = resetBatter(gameData);
    }

    if (gameData.strikes > 2) {
        gameData = resetBatter(gameData)
        .set('outs', gameData.outs + 1);
    }

    if (gameData.outs > 2) {
        gameData = resetBatter(gameData)
        .set('outs', 0)
        .set('inning', gameData.inning + 1);
    }

    return gameData;
}

const data = (state=initialState, action) => {
    var gameData;
    var undos;

    if (action.type !== UNDO) {
        undos = state.undos.push(state.gameData);
        state = state.set('undos', undos);
    }

    switch (action.type) {
        case INCREMENT:
            gameData = state.gameData.set(action.payload, state.gameData[action.payload]+1);
            gameData = correctIncrement(gameData);
            if (action.payload === 'inning') {
                gameData = resetBatter(gameData);
            }
            state = state.set('gameData', gameData);
            break;

        case NEXT_BATTER:
            state = state.set('gameData', resetBatter(state.gameData));
            break;

        case NEW_GAME:
            state = state.set('gameData', initialState);
            break;

        case UNDO:
            gameData = state.undos.last();
            undos = state.undos.pop();
            state = state
            .set('gameData', gameData)
            .set('undos', undos);

    }

    return state;
};

const rootReducer = combineReducers({data});

export default rootReducer;
