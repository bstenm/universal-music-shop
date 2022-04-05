/* eslint-disable no-param-reassign */
import Client, { Product } from 'shopify-buy';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IMarketItem } from 'config/types';
import { IProductsState } from 'state/products//interface';
import { shopifyDomain, shopifyStorefrontAccessToken } from 'config/constants';

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
    const client = Client.buildClient({
        domain: shopifyDomain,
        storefrontAccessToken: shopifyStorefrontAccessToken
    });
    const products: Product[] = await client.product.fetchAll();
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
    }
});

export const productsReducer = productsSlice.reducer;
