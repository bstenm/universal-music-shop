import { useEffect } from 'react';

import { useExecute } from 'hooks/useExecute';
import { DatabaseService } from 'services/DatabaseService';
import { IMarketItem } from 'config/types';

type ReturnType = [items: IMarketItem[], loading: boolean];

export const useFetchAllMarketItems = (): ReturnType => {
    const request = async (): Promise<IMarketItem[]> => DatabaseService.getAllMarketItems();

    const [getAllMarketItems, items, fetching] = useExecute<IMarketItem[]>({
        errorMessage: 'getAllMarketItemsError',
        request
    });

    useEffect(() => {
        getAllMarketItems();
    }, []);

    return [items || [], fetching];
};
