import Client from 'shopify-buy';

import { shopifyDomain, shopifyStorefrontAccessToken } from 'config/constants';

export const shopifyClient = Client.buildClient({
    domain: shopifyDomain,
    storefrontAccessToken: shopifyStorefrontAccessToken
});
