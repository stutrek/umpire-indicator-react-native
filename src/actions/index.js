/* @flow */
/*global setTimeout*/

export const INCREMENT = 'INCREMENT';
export const NEXT_BATTER = 'NEXT_BATTER';
export const NEW_GAME = 'NEW_GAME';
export const UNDO = 'UNDO';

export function increment (property) {
    return {
        type: INCREMENT,
        payload: property
    };
}

export function nextBatter () {
    return {
        type: NEXT_BATTER
    };
}

export function newGame () {
    return {
        type: NEW_GAME
    };
}

export function undo () {
    return {
        type: UNDO
    };
}
