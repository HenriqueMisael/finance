import { all } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { throttle } from 'lodash-es';

import core from './core';
import modal from './modal';
import entryList, { entryListSagas } from './entry-list';
import { loadState, saveState } from './local-storage';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSagas() {
  yield all([...entryListSagas]);
}

const persistedCore = loadState();

const store = createStore(
  combineReducers({
    core: core.reducers,
    modal: modal.reducers,
    entryList: entryList.reducers,
  }),
  {
    core: persistedCore,
  },
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

store.subscribe(
  throttle(() => {
    saveState({
      entry: store.getState().core.entry,
      spareIDs: store.getState().core.spareIDs,
    });
  }),
);

export default store;

sagaMiddleware.run(rootSagas);
