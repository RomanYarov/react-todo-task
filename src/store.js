import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import taskReducer from './component/reducers';
import * as localStore from "./localStore";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const _store = createStore(
    combineReducers({task: taskReducer}),
    localStore.get(),
    composeEnhancers(applyMiddleware(thunk))
);

export default function store() {
    return _store;
}
