import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


import './index.css';
import App from './App/App.jsx';
import reducers from './reducers/index';


window.store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={window.store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
