import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import expressions from './sagas/expressions';
import expressionsReducer from './reducers/expressions';


const preloadedState = {};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(
  combineReducers({expressions: expressionsReducer}),
  preloadedState,
  composedEnhancers
);
sagaMiddleware.run(expressions);

export default () => store;