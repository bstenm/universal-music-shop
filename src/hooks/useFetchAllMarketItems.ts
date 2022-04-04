import { useEffect } from 'react';

import { IMarketItem } from 'config/types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchAllProducts } from 'state/products/productsSlice';

type ReturnType = [items: IMarketItem[]];

export const useFetchAllMarketItems = (): ReturnType => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, []);

    return [[]];
};
