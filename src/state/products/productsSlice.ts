/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { log } from 'libs/logger';
import { IMarketItem } from 'interfaces';
import { IProductsState } from 'state/products/interfaces';
import { storeApi, StoreProduct } from 'apis/storeApi';

const initialState = {
    items: [],
    // Track the status of the api request
    status: 'idle'
} as IProductsState;

/**
 * Extract the data that will be displayed  from the store api response
 */
const productToMarketItem = (product: StoreProduct): IMarketItem => {
    const { title, description, images, id, variants } = product;
    const image: string = images[0].src;
    const { id: variantId, price, available } = variants[0];
    return { title, description, id, image, price, available, variantId };
};

/**
 * Fetches all the products that we want to displayed from  the store
 */
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProductsStatus',
    async (): Promise<IMarketItem[]> => {
        const products: StoreProduct[] = await storeApi.fetchAllProducts();
        log.debug(products);
        return products.map(productToMarketItem);
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    // Uses immer for state immutability under the hood
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add the product list to the global state
            state.items = action.payload;
        });
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.status = 'failed';
            log.error(action.error.message);
        });
    }
});

export const productsReducer = productsSlice.reducer;
