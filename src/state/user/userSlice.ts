/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IUser } from 'interfaces';

const initialState: IUser = { id: '', purchases: [] };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        setData: (_, { payload }) => ({ ...initialState, ...payload }),
        addToPurchases: (state, { payload }) => {
            state.purchases = state.purchases?.concat(payload);
        }
    }
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
