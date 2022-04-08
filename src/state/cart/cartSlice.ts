/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { log } from 'libs/logger';
import { storeApi } from 'apis/storeApi';
import { ICartItem, IMarketItem } from 'interfaces';
import { RequestStatus } from 'types';

interface ICartState {
    open: boolean;
    items: ICartItem[];
    status: RequestStatus;
    checkoutId?: string;
    featuredProduct?: IMarketItem;
}

type UpdateCartItemArgs = {
    quantity: number;
    cartItemId: string | number;
};

type AddItemArgs = {
    item: IMarketItem;
    quantity: number;
};

type GlobalState = {
    products: {
        items: IMarketItem[];
    };
};

const initialState: ICartState = { items: [], open: false, status: 'idle' };

const findByCartItemId = (list: ICartItem[], cartItemId: string | number): number =>
    list.findIndex((item: ICartItem) => item.cartItemId === cartItemId);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ item, quantity }: AddItemArgs, thunkApi): Promise<ICartItem> => {
        // Here we set what the featured product should
        // be according to the item just added to the cart
        const globalState: GlobalState = thunkApi.getState() as GlobalState;
        const products: IMarketItem[] = globalState.products.items;
        const itemIndex: number = products.findIndex((e: IMarketItem) => e.id === item.id);
        const featuredProductIndex: number = (itemIndex + 1) % products.length;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        thunkApi.dispatch(cartSlice.actions.setFeaturedProduct(products[featuredProductIndex]));
        // Call the store api to add the item to the cart on the backend
        const cartItemId: string | number = await storeApi.addItemToCart(item.variantId, quantity);
        return { ...item, cartItemId, quantity };
    }
);

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
        },
        setFeaturedProduct: (state, { payload }) => {
            state.featuredProduct = payload;
        }
    },
    // Uses immer for state immutability under the hood
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            // Add product list to state
            state.items.push(payload);
        });
        builder.addCase(addItemToCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addItemToCart.rejected, (state, { error }) => {
            state.status = 'failed';
            log.error(error.message);
        });

        builder.addCase(updateItemQuantityInCart.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            // Update quantity in state
            const { cartItemId, quantity } = payload;
            const index = findByCartItemId(state.items, cartItemId);
            state.items[index].quantity = quantity;
            // If the quantity reaches 0 then we remove the item from the shopping cart
            if (quantity < 1) {
                state.items.splice(index, 1);
            }
        });
        builder.addCase(updateItemQuantityInCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(updateItemQuantityInCart.rejected, (state, { error }) => {
            state.status = 'failed';
            log.error(error.message);
        });

        builder.addCase(removeItemFromCart.fulfilled, (state, { payload }) => {
            // Remove item in state
            state.status = 'succeeded';
            const index = findByCartItemId(state.items, payload);
            state.items.splice(index, 1);
        });
        builder.addCase(removeItemFromCart.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(removeItemFromCart.rejected, (state, { error }) => {
            state.status = 'failed';
            log.error(error.message);
        });
    }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
