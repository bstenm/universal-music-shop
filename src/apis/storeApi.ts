import Client, { Cart, Product } from 'shopify-buy';

import { shopifyDomain, shopifyStorefrontAccessToken } from 'config/constants';

export type StoreProduct = Product;

const shopifyClient = Client.buildClient({
    domain: shopifyDomain,
    storefrontAccessToken: shopifyStorefrontAccessToken
});

const fetchAllProducts = (): Promise<Product[]> => shopifyClient.product.fetchAll();

const createCheckout = (): Promise<Cart> => shopifyClient.checkout.create();

const addItemToCart = (checkoutId: string, variantId: string, quantity: number): Promise<Cart> =>
    shopifyClient.checkout.addLineItems(checkoutId, [
        {
            variantId,
            quantity
        }
    ]);

export const storeApi = {
    addItemToCart,
    createCheckout,
    fetchAllProducts
};
