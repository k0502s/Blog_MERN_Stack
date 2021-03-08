import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas'

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {} // state 초기값

const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

  //createStore안에 있는 3개를 합쳐 store을 만들어주는 것
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);

//saga 미들웨어 작동하기 위한 것
sagaMiddleware.run(rootSaga);


export default store;