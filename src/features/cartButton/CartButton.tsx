import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { cartActions } from 'state/cart/cartSlice';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { getNbOfItemInCart } from 'state/cart/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';

export const CartButton = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const nbOfItems = useAppSelector(getNbOfItemInCart);

    const onClick = (): void => {
        dispatch(cartActions.toggle());
    };

    return (
        <IconButton onClick={onClick} aria-label="cart" title={t('cart')}>
            <Badge badgeContent={nbOfItems} color="secondary">
                <LocalGroceryStoreIcon />
            </Badge>
        </IconButton>
    );
};
