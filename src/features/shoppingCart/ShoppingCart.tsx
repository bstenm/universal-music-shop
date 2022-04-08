import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { CartItem } from 'features/shoppingCart/CartItem';
import { ICartItem } from 'interfaces';
import { TypographyIntl } from 'components/TypographyIntl';
import { Button as ButtonIntl } from 'components/Button';
import { FeaturedProduct } from 'features/shoppingCart/FeaturedProduct';
import { CheckoutButton } from 'features/shoppingCart/CheckoutButton';
import { useShoppingCart } from 'hooks/useShoppingCart';

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

/**
 * The user shopping cart with all items added for order, a featured item, and a checkout button
 */
export const ShoppingCart = (): JSX.Element => {
    // Using a hook to separate logic and markup
    const {
        items,
        status,
        totalPrice,
        featuredProduct,
        onShopNow,
        onCheckout,
        removeItem,
        updateItemQuantity
    } = useShoppingCart();

    if (!items || !items.length) {
        return (
            <Container spacing={5}>
                <TypographyIntl variant="h5" color="primary" textId="cartEmpty" />
                <ShopNowButton textId="shopNow" onClick={onShopNow} />
            </Container>
        );
    }

    // Any user event calling the store api will disabled all user action in the shopping cartwhile pending
    const pending = status === 'pending';

    return (
        <Container spacing={8}>
            <Stack spacing={1}>
                {items.map((item: ICartItem) => {
                    const { cartItemId, quantity } = item;
                    return (
                        <CartItem
                            key={cartItemId}
                            data={item}
                            loading={pending}
                            remove={() => removeItem(cartItemId)}
                            incrementQuantity={() => updateItemQuantity(cartItemId, quantity + 1)}
                            decrementQuantity={() => updateItemQuantity(cartItemId, quantity - 1)}
                        />
                    );
                })}
            </Stack>
            {featuredProduct && (
                <FeaturedProduct loading={pending} productId={featuredProduct.id} />
            )}
            <CheckoutButton loading={pending} price={totalPrice} onCheckout={onCheckout} />
        </Container>
    );
};
