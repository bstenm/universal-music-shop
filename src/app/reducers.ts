import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from '@reduxjs/toolkit';

import { userReducer } from 'state/user/userSlice';
import { alertReducer } from 'state/alert/alertSlice';

export const rootReducer = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        alert: alertReducer
    });
