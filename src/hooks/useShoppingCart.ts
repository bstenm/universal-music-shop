import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import {
    cartActions as cart,
    removeItemFromCart,
    updateItemQuantityInCart
} from 'state/cart/cartSlice';
import { RequestStatus } from 'types';
import { userActions as user } from 'state/user/userSlice';
import { ICartItem, IMarketItem } from 'interfaces';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getUserId } from 'state/user/selectors';
import { getActionStatus, getItemsInCart, getFeaturedProduct } from 'state/cart/selectors';

type ReturnType = {
    status: RequestStatus;
    items: ICartItem[];
    totalPrice: number;
    featuredProduct: IMarketItem;
    onShopNow: () => void;
    onCheckout: () => void;
    removeItem: (cartItemId: string | number) => void;
    updateItemQuantity: (cartItemId: string | number, quantity: number) => void;
};

export const useShoppingCart = (): ReturnType => {
    const history = useHistory();

    const dispatch = useAppDispatch();

    const userId: string = useAppSelector(getUserId);

    const items: ICartItem[] = useAppSelector(getItemsInCart);

    // The status of a request action triggered in the shopping cart (update quantity/remove item,...)
    const status: RequestStatus = useAppSelector(getActionStatus);

    const featuredProduct: IMarketItem = useAppSelector(getFeaturedProduct);

    /**
     * User event: Update the quantity of one entry in the shopping cart
     */
    const updateItemQuantity = (cartItemId: string | number, quantity: number): void => {
        if (quantity < 0) return;
        dispatch(updateItemQuantityInCart({ cartItemId, quantity }));
    };

    /**
     * User event: Remove the whole entry in the shopping cart
     */
    const removeItem = (cartItemId: string | number): void => {
        dispatch(removeItemFromCart(cartItemId));
    };

    /**
     * User event: Add the items to the user purchases on checkout
     * then close shopping cart drawer and redirect to shop on checkout
     */
    const onCheckout = (): void => {
        dispatch(user.addToPurchases(items));
        dispatch(cart.empty());
        dispatch(cart.toggle());
        history.push(`/my-purchases/${userId}`);
    };

    /**
     * User event: Close shopping cart drawer and redirect to shop on button click
     */
    const onShopNow = (): void => {
        dispatch(cart.toggle());
        history.push('/marketplace');
    };

    // The total price that will be displayed in the shopping cart
    const totalPrice: number = useMemo(
        () =>
            items.reduce((acc: number, { price, quantity }: ICartItem) => {
                // eslint-disable-next-line no-param-reassign
                acc += parseInt(price, 10) * quantity;
                return acc;
            }, 0),
        [items]
    );

    return {
        items,
        status,
        totalPrice,
        featuredProduct,
        onShopNow,
        onCheckout,
        removeItem,
        updateItemQuantity
    };
};
