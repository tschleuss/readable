import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './containers/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(reducer, /* preloadedState, */ composeWithDevTools(
    applyMiddleware(thunk, logger),
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
