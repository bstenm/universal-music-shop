import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useExecute } from 'hooks/useExecute';
import { IPurchasedItem } from 'config/types';
import { DatabaseService } from 'services/DatabaseService';

type Props = {
    assets: IPurchasedItem[];
    fetching: boolean;
};

export const useFetchUserTickets = (): Props => {
    const { userId } = useParams<{ userId: string }>();

    const request = async (): Promise<IPurchasedItem[]> => {
        return DatabaseService.getUserAssets(userId);
    };

    const [execute, result, fetching] = useExecute<IPurchasedItem[]>({
        errorMessage: 'getAssetsError',
        request
    });

    useEffect(() => {
        execute();
    }, []);

    return { assets: result ?? [], fetching };
};
