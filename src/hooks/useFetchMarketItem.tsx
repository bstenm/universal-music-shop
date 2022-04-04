import { DatabaseService } from 'services/DatabaseService';
import { log } from 'libs/logger';
import { useEffect, useState } from 'react';

import { useAlert } from 'hooks/useAlert';
import { IMarketItem } from 'config/types';

type ReturnType = [item: IMarketItem | undefined, loading: boolean];

export const useFetchMarketItem = (itemId: string): ReturnType => {
    const [item, setItem] = useState<IMarketItem>();

    const [loading, setLoading] = useState<boolean>(false);

    const { errorAlert } = useAlert();

    const getMarketItem = async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setItem(await DatabaseService.getMarketItem(id));
        } catch (e) {
            errorAlert('getMarketItemError');
            log.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMarketItem(itemId);
    }, []);

    return [item, loading];
};
