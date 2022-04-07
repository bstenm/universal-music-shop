import Client, { Cart, Product } from 'shopify-buy';

import { log } from 'libs/logger';
import { shopifyDomain, shopifyStorefrontAccessToken } from 'config/constants';

export type StoreProduct = Product;

let cartId: string | number;

const shopifyClient = Client.buildClient({
    domain: shopifyDomain,
    storefrontAccessToken: shopifyStorefrontAccessToken
});

const fetchAllProducts = (): Promise<Product[]> => shopifyClient.product.fetchAll();

const createCheckout = (): Promise<Cart> => shopifyClient.checkout.create();

const getCartId = async (): Promise<string | number> => {
    if (cartId) return cartId;
    const cart: Cart = await createCheckout();
    log.debug('Cart', cart);
    cartId = cart.id;
    return cartId;
};

const addItemToCart = async (variantId: string | number, quantity: number): Promise<Cart> => {
    const cart: Cart = await shopifyClient.checkout.addLineItems(await getCartId(), [
        {
            variantId,
            quantity
        }
    ]);
    log.debug('Card with new item', cart);
    return cart;
};

export const storeApi = {
    addItemToCart,
    createCheckout,
    fetchAllProducts
};
