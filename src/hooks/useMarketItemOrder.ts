import { useState } from 'react';

import { cartActions } from 'state/cart/cartSlice';
import { IMarketItem } from 'interfaces';
import { useAppSelector } from 'hooks/useAppSelector';
import { getProductData } from 'state/products/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { shopifyClient } from 'libs/shopifyClient';

type ReturnType = {
    item: IMarketItem;
    totalPrice: number;
    addToCart: () => Promise<void>;
    selectQuantity: (value: number) => void;
};

export const useMarketItemOrder = (itemId: string | number): ReturnType => {
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState<number>(1);

    const item: IMarketItem = useAppSelector((state) => getProductData(state, itemId));

    const selectQuantity = (value: number): void => {
        setQuantity(value);
    };

    const addToCart = async (): Promise<void> => {
        const checkout = await shopifyClient.checkout.create();
        console.log('CHECKOUT >>>>>> ', checkout);
        dispatch(cartActions.addItem({ item, quantity }));
    };

    const totalPrice = item ? parseInt(item.price, 10) * quantity : 0;

    return { item, totalPrice, addToCart, selectQuantity };
};
