/* eslint-disable no-param-reassign */
import { nanoid } from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';

import { ICartItem } from 'interfaces';

interface ICartState {
    open: boolean;
    items: ICartItem[];
}

const initialState: ICartState = { items: [], open: false };

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggle: (state) => {
            state.open = !state.open;
        },
        empty: (state) => {
            state.items = [];
        },
        addItem: (state, action) => {
            const { item, quantity } = action.payload;
            state.items.push({ ...item, quantity, cartId: nanoid() });
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item: ICartItem) => item.cartId === itemId);
            state.items.splice(index, 1);
        },
        incrementItemQuantity: (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item: ICartItem) => item.cartId === itemId);
            state.items[index].quantity += 1;
        },
        decrementItemQuantity: (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item: ICartItem) => item.cartId === itemId);
            if (state.items[index].quantity > 0) {
                state.items[index].quantity -= 1;
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
