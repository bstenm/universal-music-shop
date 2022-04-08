import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getProducts } from 'state/products/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchAllProducts } from 'state/products/productsSlice';
import { RequestStatus } from 'types';
import { IMarketItem } from 'interfaces';

type ReturnType = {
    items: IMarketItem[];
    status: RequestStatus;
    onSelect: (itemId: string | number) => void;
};

export const useMarketplace = (): ReturnType => {
    const history = useHistory();

    const dispatch = useAppDispatch();

    // Call to store api to get all the shop products: get status of request and result
    const { items, status } = useAppSelector(getProducts);

    /**
     * User event: click to view item details
     */
    const onSelect = (itemId: string | number): void => {
        history.push(`/market-item/${itemId}`);
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return { items, status, onSelect };
};
