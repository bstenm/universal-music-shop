/* eslint-disable no-param-reassign */
import { Product } from 'shopify-buy';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IMarketItem } from 'interfaces';
import { shopifyClient } from 'libs/shopifyClient';
import { IProductsState } from 'state/products//interface';

const initialState = {
    items: [],
    status: 'idle'
} as IProductsState;

const productToMarketItem = (product: Product): IMarketItem => {
    const { title, description, images, id, variants } = product;
    const image: string = images[0].src;
    const { price, available } = variants[0];
    return { title, description, id, image, price, available };
};

export const fetchAllProducts = createAsyncThunk('products/fetchAllProductsStatus', async () => {
    const products: Product[] = await shopifyClient.product.fetchAll();
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
        builder.addCase(fetchAllProducts.rejected, (_, action) => {
            console.log(action.error.message);
        });
    }
});

export const productsReducer = productsSlice.reducer;
