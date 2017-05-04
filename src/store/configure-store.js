/* @flow */

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const configureStore = function (initialState: Object = {}): Function {
    return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;
