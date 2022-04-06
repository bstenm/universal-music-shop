import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import { Main } from 'components/Main';
import { Aside } from 'features/sidebar/Aside';
import { cartIsOpen } from 'state/cart/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { cartActions as cart } from 'state/cart/cartSlice';
import { ShoppingCartDrawer } from 'features/shoppingCartDrawer/ShoppingCartDrawer';

const Container = styled('div')`
    height: 100%;
    display: flex;
`;

export const Layout = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [toggled, setToggled] = useState<boolean>(false);

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const shoppingCartIsOpen = useAppSelector(cartIsOpen);

    const handleCollapsedChange = (checked: boolean): void => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value: boolean): void => {
        setToggled(value);
    };

    const toggleShoppingCart = (): void => {
        dispatch(cart.toggle());
    };

    return (
        <Container>
            <Aside
                toggled={toggled}
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
            />
            <Main
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
            />
            <Drawer anchor="right" open={shoppingCartIsOpen} onClose={() => toggleShoppingCart()}>
                <ShoppingCartDrawer />
            </Drawer>
        </Container>
    );
};
