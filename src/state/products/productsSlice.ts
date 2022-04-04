import Client, { Product } from 'shopify-buy';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMarketItem } from 'config/types';

const initialState: IMarketItem[] = [];

const productToMarketItem = (product: Product): IMarketItem => {
    const { title, description, images, id, variants } = product;
    const image: string = images[0].src;
    const { price, available } = variants[0];
    return { title, description, id, image, price, available };
};

export const fetchAllProducts = createAsyncThunk('products/fetchAllProductsStatus', async () => {
    const client = Client.buildClient({
        domain: 'programming-9190.myshopify.com',
        storefrontAccessToken: '8090124e9b9b8f3c14952e237a49de38'
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
            state.concat(action.payload);
        });
    }
});

export const productsReducer = productsSlice.reducer;
