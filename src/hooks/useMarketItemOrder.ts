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

    // Track the item quantity according to what the user selected
    const [quantity, setQuantity] = useState<number>(1);

    const item: IMarketItem = useAppSelector((state) => getProductData(state, itemId));

    /**
     *  User event: Set item quantity
     */
    const selectQuantity = (value: number): void => {
        setQuantity(value);
    };

    /**
     *  User event: Add new item to the shopping cart
     */
    const addToCart = async (): Promise<void> => {
        dispatch(addItemToCart({ item, quantity }));
    };

    // The total pricefor this specific order
    const totalPrice = item ? parseInt(item.price, 10) * quantity : 0;

    return { item, totalPrice, addToCart, selectQuantity };
};
