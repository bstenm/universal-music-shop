import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import { CartItem } from 'features/shoppingCartDrawer/CartItem';
import { ICartItem } from 'interfaces';
import { cartActions as cart } from 'state/cart/cartSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { cartIsOpen, getItemsInCart } from 'state/cart/selectors';
import { FeaturedProduct } from 'features/shoppingCartDrawer/FeaturedProduct';
import { Button } from 'components/Button';

const Container = styled(Stack)`
    width: 450px;
    padding: 30px;
`;

export const ShoppingCartDrawer = (): JSX.Element => {
    const items = useAppSelector(getItemsInCart);

    const isOpen = useAppSelector(cartIsOpen);

    const dispatch = useAppDispatch();

    const toggleDrawer = (): void => {
        dispatch(cart.toggle());
    };

    const incrementItemQuantity = (itemId: string | number): void => {
        dispatch(cart.incrementItemQuantity(itemId));
    };

    const decrementItemQuantity = (itemId: string | number, quantity: number): void => {
        if (quantity < 1) return;
        dispatch(cart.decrementItemQuantity(itemId));
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer()}>
            <Container spacing={5}>
                <Stack spacing={1}>
                    {items.map((item: ICartItem) => (
                        <CartItem
                            key={item.cartId}
                            data={item}
                            incrementQuantity={incrementItemQuantity}
                            decrementQuantity={decrementItemQuantity}
                        />
                    ))}
                </Stack>
                {items[0] && <FeaturedProduct productId={items[0].id} />}
                <Button textId="checkout" color="secondary" variant="contained" />
            </Container>
        </Drawer>
    );
};
