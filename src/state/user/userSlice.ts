import { createSlice } from '@reduxjs/toolkit';

import { IPurchasedItem } from 'config/types';

export type User = {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    lastName?: string;
    createdAt?: number;
    firstName?: string;
    assets?: IPurchasedItem[];
};

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
