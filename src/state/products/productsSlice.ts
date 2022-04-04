import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IMarketItem } from 'config/types';

const initialState: IMarketItem[] = [];

const productsAPI = {
    fetchAll: async () => {
        const response = await fetch(
            'https://programming-9190.myshopify.com/admin/api/2022-04/products.json',
            {
                method: 'GET',
                headers: {
                    'X-Shopify-Access-Token': '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'
                }
            }
        );
        return response.json();
    }
};

export const fetchAllProducts = createAsyncThunk('products/fetchAllProductsStatus', async () => {
    const response = await productsAPI.fetchAll();
    console.log('ALL PRODUCTS', response);
    return response;
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    }
});

export const productsReducer = productsSlice.reducer;

// console.log(
//     '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
//     process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN
// );
