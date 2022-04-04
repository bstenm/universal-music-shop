import Client from 'shopify-buy';
import { useEffect } from 'react';

import { useExecute } from 'hooks/useExecute';
import { IMarketItem } from 'config/types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { DatabaseService } from 'services/DatabaseService';
import { fetchAllProducts } from 'state/products/productsSlice';

type ReturnType = [items: IMarketItem[], loading: boolean];

export const useFetchAllMarketItems = (): ReturnType => {
    const dispatch = useAppDispatch();

    const request = async (): Promise<IMarketItem[]> => DatabaseService.getAllMarketItems();

    const [getAllMarketItems, items, fetching] = useExecute<IMarketItem[]>({
        errorMessage: 'getAllMarketItemsError',
        request
    });

    useEffect(() => {
        // Initializing a client to return tent in the store's primary language
        const client = Client.buildClient({
            domain: 'programming-9190.myshopify.com',
            storefrontAccessToken: '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'
        });
        client.product.fetchAll().then((products) => {
            console.log(products);
        });
        getAllMarketItems();
    }, []);

    return [items || [], fetching];
};
