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

const findByCartItemId = (list: ICartItem[], cartItemId: string | number): number =>
    list.findIndex((item: ICartItem) => item.cartItemId === cartItemId);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ item, quantity }: AddItemArgs): Promise<ICartItem> => {
        const cartItemId: string | number = await storeApi.addItemToCart(item.variantId, quantity);
        return { ...item, cartItemId, quantity };
    }
);

type UpdateCartItemArgs = {
    quantity: number;
    cartItemId: string | number;
};

export const updateItemQuantityInCart = createAsyncThunk(
    'cart/updateItemQuantityInCart',
    async ({ cartItemId, quantity }: UpdateCartItemArgs): Promise<UpdateCartItemArgs> => {
        await storeApi.updateItemQuantityInCart(cartItemId, quantity);
        return { cartItemId, quantity };
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (cartItemId: string | number): Promise<string | number> => {
        await storeApi.removeItemFromCart(cartItemId);
        return cartItemId;
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

        builder.addCase(updateItemQuantityInCart.fulfilled, (state, action) => {
            const { cartItemId, quantity } = action.payload;
            const index = findByCartItemId(state.items, cartItemId);
            state.items[index].quantity = quantity;
            if (quantity < 1) {
                state.items.splice(index, 1);
            }
        });
        builder.addCase(updateItemQuantityInCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(updateItemQuantityInCart.rejected, (state, action) => {
            state.status = 'failed';
            log.error(action.error.message);
        });

        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            const cartItemId = action.payload;
            const index = findByCartItemId(state.items, cartItemId);
            state.items.splice(index, 1);
        });
        builder.addCase(removeItemFromCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            state.status = 'failed';
            log.error(action.error.message);
        });
    }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
