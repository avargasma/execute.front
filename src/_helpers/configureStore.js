import { createStore, applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'

const loggerMiddleware = createLogger();

export const history = createHashHistory({
    hashType: 'slash',
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer(history), // root reducer with router state
      preloadedState,
      compose(
        applyMiddleware(
            routerMiddleware(history), 
            thunkMiddleware,
            loggerMiddleware
        ),
      ),
    )
  
    return store
  }

/* export const store = createStore(
    rootReducer,    
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
); */