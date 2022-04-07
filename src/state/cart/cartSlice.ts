/* eslint-disable no-param-reassign */
import { nanoid } from 'nanoid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ICartItem, IMarketItem } from 'interfaces';
import { storeApi, StoreProduct } from 'apis/storeApi';
import { log } from 'libs/logger';

interface ICartState {
    open: boolean;
    items: ICartItem[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ICartState = { items: [], open: false, status: 'idle' };

type AddItemArgs = {
    item: IMarketItem;
    quantity: number;
};

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ item, quantity }: AddItemArgs) => {
        // await storeApi.addItemToCart();
        // const checkout = await shopifyClient.checkout.create();
    }
);

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
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            // Add product list to state
            // state.items.push({ ...item, quantity, cartId: nanoid() });
        });
        builder.addCase(addItemToCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addItemToCart.rejected, (state, action) => {
            state.status = 'failed';
            log.error(action.error.message);
        });
    }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
