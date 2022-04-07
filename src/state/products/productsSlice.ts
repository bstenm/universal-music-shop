/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { log } from 'libs/logger';
import { IMarketItem } from 'interfaces';
import { IProductsState } from 'state/products//interface';
import { storeApi, StoreProduct } from 'apis/storeApi';

const initialState = {
    items: [],
    status: 'idle'
} as IProductsState;

const productToMarketItem = (product: StoreProduct): IMarketItem => {
    const { title, description, images, id, variants } = product;
    const image: string = images[0].src;
    const { id: variantId, price, available } = variants[0];
    return { title, description, id, image, price, available, variantId };
};

export const fetchAllProducts = createAsyncThunk('products/fetchAllProductsStatus', async () => {
    const products: StoreProduct[] = await storeApi.fetchAllProducts();
    log.debug(products);
    return products.map(productToMarketItem);
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            // Add product list to state
            state.status = 'succeeded';
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
