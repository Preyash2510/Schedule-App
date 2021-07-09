import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {compose, createStore} from 'redux';
import { reducers } from './Reducers/all';
import { loadState, saveState } from "./services/storeState";
import {deleteUsers} from "./Reducers/users";
import {setTitle} from "./Reducers/other";

const store = createStore(
    reducers,
    loadState(),
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

store.subscribe(() => {
    saveState(store.getState());
});

store.dispatch(deleteUsers());
store.dispatch(setTitle('Dashboard'));

window.addEventListener('beforeunload', () => {
    saveState(store.getState());
})

window.localStorage.setItem('user', undefined);
window.localStorage.setItem('api_key', undefined);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export default store;
