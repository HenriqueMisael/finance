import { all } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { throttle } from 'lodash-es';

import core from './core';
import modal from './modal';
import entryList, { entryListSagas } from './entry-list';
import { loadState, saveState } from './local-storage';
import profile, { profileSagas } from './profile';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* rootSagas() {
  yield all([...entryListSagas, ...profileSagas]);
}

const { core: persistedCore } = loadState();

const store = createStore(
  combineReducers({
    core: core.reducers,
    profile: profile.reducers,
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
      core: {
        entry: store.getState().core.entry,
        spareIDs: store.getState().core.spareIDs,
        profile: store.getState().core.profile,
      },
    });
  }),
);

export default store;

sagaMiddleware.run(rootSagas);
