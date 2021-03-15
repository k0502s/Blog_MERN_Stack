import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer.js';
import memberReducer from './memberReducer';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        auth: authReducer,
        member: memberReducer,
    });

export default createRootReducer;
