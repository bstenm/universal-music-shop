import Client, { Cart, Product } from 'shopify-buy';

import { log } from 'libs/logger';
import { shopifyDomain, shopifyStorefrontAccessToken } from 'config/constants';

export type StoreProduct = Product;

let cartId: string | number;

const client = Client.buildClient({
    domain: shopifyDomain,
    storefrontAccessToken: shopifyStorefrontAccessToken
});

const fetchAllProducts = (): Promise<Product[]> => client.product.fetchAll();

const createCheckout = (): Promise<Cart> => client.checkout.create();

const getCartId = async (): Promise<string | number> => {
    if (cartId) return cartId;
    const cart: Cart = await createCheckout();
    log.debug('Cart', cart);
    cartId = cart.id;
    return cartId;
};

const addItemToCart = async (
    variantId: string | number,
    quantity: number
): Promise<string | number> => {
    const cId = await getCartId();
    const cart: Cart = await client.checkout.addLineItems(cId, [
        {
            variantId,
            quantity
        }
    ]);
    log.debug('Card with new item', cart);
    return cart.lineItems[0].id;
};

const updateItemQuantityInCart = async (id: string | number, quantity: number): Promise<void> => {
    const cId = await getCartId();
    const cart: Cart = await client.checkout.updateLineItems(cId, [{ id, quantity }]);
    log.debug('Card with updated item', cart);
};

const removeItemFromCart = async (lineItemId: string | number): Promise<void> => {
    const cId = await getCartId();
    const cart: Cart = await client.checkout.removeLineItems(cId, [lineItemId.toString()]);
    log.debug('Card without item', cart);
};

export const storeApi = {
    addItemToCart,
    createCheckout,
    fetchAllProducts,
    removeItemFromCart,
    updateItemQuantityInCart
};
