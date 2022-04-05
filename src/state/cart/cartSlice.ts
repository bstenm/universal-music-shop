import { createSlice } from '@reduxjs/toolkit';

import { IMarketItem } from 'config/types';

const initialState: IMarketItem[] = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
