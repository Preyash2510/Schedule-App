import { combineReducers } from 'redux';
import loginTypeReducer from "./login";
import authentication from "./auth";
import throwError from "./error";
import setOthers from './other';
import getUsers from "./users";

export const reducers = combineReducers(
    {
        loginPage: loginTypeReducer,
        auth: authentication,
        error: throwError,
        other: setOthers,
        users: getUsers
    }
);
