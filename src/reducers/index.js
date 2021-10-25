import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import repoReducer from "./repoReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    repos: repoReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));