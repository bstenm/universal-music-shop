/* eslint-disable no-param-reassign */
import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export type AlertProps = {
    type: AlertColor;
    open: boolean;
    message: string;
};

const initialState: AlertProps = {
    open: false,
    message: '',
    type: 'error'
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        close: (): AlertProps => initialState,
        open: (state, { payload }) => {
            // Uses immer for state immutability under the hood
            state.open = true;
            state.type = payload.type;
            state.message = payload.message;
        }
    }
});

export const alertActions = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
