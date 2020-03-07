import { all } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import core from './core';
import modal from './modal';
import { entryListSagas } from './entry-list';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSagas() {
  yield all([...entryListSagas]);
}

export default createStore(
  combineReducers({ core: core.reducers, modal: modal.reducers }),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSagas);
