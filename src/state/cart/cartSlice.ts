/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { log } from 'libs/logger';
import { storeApi } from 'apis/storeApi';
import { ICartItem, IMarketItem } from 'interfaces';

interface ICartState {
    open: boolean;
    items: ICartItem[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    checkoutId?: string;
}

const initialState: ICartState = { items: [], open: false, status: 'idle' };

type AddItemArgs = {
    item: IMarketItem;
    quantity: number;
};

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ item, quantity }: AddItemArgs): Promise<ICartItem> => {
        await storeApi.addItemToCart(item.variantId, quantity);
        return { ...item, quantity };
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
            const index = state.items.findIndex((item: ICartItem) => item.id === itemId);
            state.items.splice(index, 1);
        },
        incrementItemQuantity: (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item: ICartItem) => item.id === itemId);
            state.items[index].quantity += 1;
        },
        decrementItemQuantity: (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item: ICartItem) => item.id === itemId);
            if (state.items[index].quantity > 0) {
                state.items[index].quantity -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            // Add product list to state
            state.items.push(action.payload);
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
