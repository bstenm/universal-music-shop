import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import MuiCardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { Chip, Typography } from '@mui/material';

import { Space } from 'components/Space';
import { Button } from 'components/Button';
import { IMarketItem } from 'config/types';
import { EmptyResponse } from 'components/EmptyResponse';
import { TotalPrice } from 'features/marketItem/TotalPrice';
import { ItemQuantity } from 'features/marketItem/ItemQuantity';
import { useAppSelector } from 'hooks/useAppSelector';
import { getProductData } from 'state/products/selectors';
import { cartActions } from 'state/cart/cartSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { shopifyClient } from 'libs/shopifyClient';

const Card = styled(MuiCard)(({ theme }) => ({
    color: 'white',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '91ch',
    borderRadius: '0px'
}));

const CardContent = styled(MuiCardContent)`
    gap: 50px;
    display: flex;
`;

const RightPanel = styled('div')`
    gap: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 30px;
    flex-direction: column;
    justify-content: center;
`;

export const MarketItem = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { itemId } = useParams<{ itemId: string }>();

    const [quantity, setQuantity] = useState<number>(1);

    const item: IMarketItem = useAppSelector((state) => getProductData(state, itemId));

    const onAddToCart = (): void => {
        shopifyClient.checkout.create().then((checkout) => {
            // Do something with the checkout
            console.log('CHECKOUT >>>>>> ', checkout);
        });
        dispatch(cartActions.addItemToCart(item));
    };

    if (!item) {
        return <EmptyResponse message="itemNotFound" />;
    }

    const totalPrice = parseInt(item.price, 10) * quantity;

    return (
        <Card>
            <CardContent>
                <div>
                    <img src={item.image} width="400px" alt="T-shirt" />
                </div>
                <RightPanel>
                    <Typography variant="h6" color="primary">
                        {item.description}
                    </Typography>
                    <Space height="5px" />
                    <Typography variant="body1" color="primary">
                        {item.title}
                    </Typography>
                    <Space height="10px" />
                    <Chip label={t('order').toUpperCase()} />
                    <Space height="5px" />
                    <ItemQuantity range={10} onSelect={setQuantity} />
                    <TotalPrice data={totalPrice} />
                    <Space height="5px" />
                    {totalPrice && totalPrice > 0 && (
                        <Button variant="outlined" textId="addToCart" onClick={onAddToCart} />
                    )}
                </RightPanel>
            </CardContent>
        </Card>
    );
};
