import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        setInfo: (_, { payload }) => ({ ...initialState, ...payload }),
        updateInfo: (state, { payload }) => ({ ...state, ...payload })
    }
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
