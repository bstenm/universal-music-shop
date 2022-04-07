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
import { CartItem } from 'features/shoppingCartDrawer/CartItem';
import { ICartItem, IMarketItem } from 'interfaces';
import { TypographyIntl } from 'components/TypographyIntl';
import { Button as ButtonIntl } from 'components/Button';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getProducts } from 'state/products/selectors';
import { getItemsInCart } from 'state/cart/selectors';
import { FeaturedProduct } from 'features/shoppingCartDrawer/FeaturedProduct';

const Container = styled(Stack)`
    padding: 30px;
`;

const ShopNowButton = styled(ButtonIntl)(({ theme }) => ({
    color: '#FFF',
    backgroundColor: theme.palette.secondary.main,
    '&: hover': {
        backgroundColor: theme.palette.primary.main
    }
}));

export const ShoppingCartDrawer = (): JSX.Element => {
    const history = useHistory();

    const items = useAppSelector(getItemsInCart);

    const dispatch = useAppDispatch();

    const updateItemQuantity = (cartItemId: string | number, quantity: number): void => {
        if (quantity < 0) return;
        dispatch(updateItemQuantityInCart({ cartItemId, quantity }));
    };

    const removeItem = (cartItemId: string | number): void => {
        dispatch(removeItemFromCart(cartItemId));
    };

    const onCheckout = (): void => {
        dispatch(cart.empty());
        dispatch(cart.toggle());
        history.push('/marketplace');
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

    /** Just for the demo  */
    const marketplace = useAppSelector(getProducts);
    const featureProduct = marketplace.items.find((item: IMarketItem) =>
        item.title.includes('white')
    );

    if (!items || !items.length) {
        return (
            <Container spacing={5}>
                <TypographyIntl variant="h5" color="primary" textId="cartEmpty" />
                <ShopNowButton textId="shopNow" onClick={onShopNow} />
            </Container>
        );
    }

    return (
        <Container spacing={5}>
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
            {featureProduct && <FeaturedProduct productId={featureProduct.id} />}
            <Button
                sx={(theme) => ({ backgroundColor: theme.palette.secondary.dark })}
                variant="contained"
                onClick={onCheckout}
                endIcon={<ImCreditCard />}>
                {`$${totalPrice}`}&nbsp;
            </Button>
        </Container>
    );
};
