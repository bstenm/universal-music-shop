import { useState } from 'react';

import { addItemToCart } from 'state/cart/cartSlice';
import { IMarketItem } from 'interfaces';
import { useAppSelector } from 'hooks/useAppSelector';
import { getProductData } from 'state/products/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';

type ReturnType = {
    item: IMarketItem;
    totalPrice: number;
    addToCart: () => Promise<void>;
    selectQuantity: (value: number) => void;
};

export const useMarketItemOrder = (itemId: string | number): ReturnType => {
    const dispatch = useAppDispatch();

    // Update the item quantity according to what the user selected
    const [quantity, setQuantity] = useState<number>(1);

    const item: IMarketItem = useAppSelector((state) => getProductData(state, itemId));

    // Set item quantity the user selected
    const selectQuantity = (value: number): void => {
        setQuantity(value);
    };

    const addToCart = async (): Promise<void> => {
        dispatch(addItemToCart({ item, quantity }));
    };

    // The total pricefor this order
    const totalPrice = item ? parseInt(item.price, 10) * quantity : 0;

    return { item, totalPrice, addToCart, selectQuantity };
};
