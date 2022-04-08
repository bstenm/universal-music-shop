import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { ImCreditCard } from 'react-icons/im';

import {
    cartActions as cart,
    removeItemFromCart,
    updateItemQuantityInCart
} from 'state/cart/cartSlice';
import { userActions as user } from 'state/user/userSlice';
import { CartItem } from 'features/shoppingCart/CartItem';
import { ICartItem } from 'interfaces';
import { TypographyIntl } from 'components/TypographyIntl';
import { Button as ButtonIntl } from 'components/Button';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getUserId } from 'state/user/selectors';
import { getItemsInCart, getFeaturedProduct } from 'state/cart/selectors';
import { FeaturedProduct } from 'features/shoppingCart/FeaturedProduct';

const Container = styled(Stack)`
    padding: 30px;
    width: 450px;
`;

const ShopNowButton = styled(ButtonIntl)(({ theme }) => ({
    color: '#FFF',
    backgroundColor: theme.palette.secondary.main,
    '&: hover': {
        backgroundColor: theme.palette.primary.main
    }
}));

export const ShoppingCart = (): JSX.Element => {
    const history = useHistory();

    const userId = useAppSelector(getUserId);

    const items = useAppSelector(getItemsInCart);

    const featuredProduct = useAppSelector(getFeaturedProduct);

    const dispatch = useAppDispatch();

    const updateItemQuantity = (cartItemId: string | number, quantity: number): void => {
        if (quantity < 0) return;
        dispatch(updateItemQuantityInCart({ cartItemId, quantity }));
    };

    const removeItem = (cartItemId: string | number): void => {
        dispatch(removeItemFromCart(cartItemId));
    };

    const onCheckout = (): void => {
        dispatch(user.addToPurchases(items));
        dispatch(cart.empty());
        dispatch(cart.toggle());
        history.push(`/my-purchases/${userId}`);
    };

    const onShopNow = (): void => {
        dispatch(cart.toggle());
        history.push('/marketplace');
    };

    const totalPrice = items.reduce((acc: number, { price, quantity }: ICartItem) => {
        // eslint-disable-next-line no-param-reassign
        acc += parseInt(price, 10) * quantity;
        return acc;
    }, 0);

    if (!items || !items.length) {
        return (
            <Container spacing={5}>
                <TypographyIntl variant="h5" color="primary" textId="cartEmpty" />
                <ShopNowButton textId="shopNow" onClick={onShopNow} />
            </Container>
        );
    }

    return (
        <Container spacing={8}>
            <Stack spacing={1}>
                {items.map((item: ICartItem) => {
                    const { cartItemId, quantity } = item;
                    return (
                        <CartItem
                            key={cartItemId}
                            data={item}
                            remove={() => removeItem(cartItemId)}
                            incrementQuantity={() => updateItemQuantity(cartItemId, quantity + 1)}
                            decrementQuantity={() => updateItemQuantity(cartItemId, quantity - 1)}
                        />
                    );
                })}
            </Stack>
            {featuredProduct && <FeaturedProduct productId={featuredProduct.id} />}
            <Button
                sx={(theme) => ({ backgroundColor: theme.palette.secondary.dark })}
                variant="contained"
                onClick={onCheckout}
                endIcon={<ImCreditCard />}>
                {`$${totalPrice}`}
            </Button>
        </Container>
    );
};
