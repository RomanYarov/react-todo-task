import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as localStore from "./localStore";

const takeStore = store();

takeStore.subscribe(() => {
    localStore.set(takeStore.getState(), ['task']);
});

ReactDOM.render(
    <Provider store={takeStore}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
