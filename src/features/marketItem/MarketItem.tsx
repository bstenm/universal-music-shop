import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { Chip, Typography } from '@mui/material';

import { Space } from 'components/Space';
import { Button } from 'components/Button';
import { EmptyResponse } from 'components/EmptyResponse';
import { TotalPrice } from 'features/marketItem/TotalPrice';
import { ItemQuantity } from 'features/marketItem/ItemQuantity';
import { useMarketItemOrder } from 'hooks/useMarketItemOrder';

type Props = {
    itemId: string | number;
};

const Card = styled(MuiCard)(({ theme }) => ({
    color: 'white',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '91ch',
    borderRadius: '0px'
}));

const CardContent = styled(MuiCardContent)(({ theme }) => ({
    gap: '50px',
    display: 'flex',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column'
    }
}));

const RightPanel = styled('div')`
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    flex-direction: column;
    justify-content: center;
`;

export const MarketItem = ({ itemId }: Props): JSX.Element => {
    const { t } = useTranslation();

    const { item, totalPrice, addToCart, selectQuantity } = useMarketItemOrder(itemId);

    if (!item) {
        return <EmptyResponse message="itemNotFound" />;
    }

    return (
        <Card>
            <CardContent>
                <img src={item.image} width="400px" alt={item.description} />
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
                    <ItemQuantity range={10} onSelect={selectQuantity} />
                    <TotalPrice data={totalPrice} />
                    <Space height="5px" />
                    {totalPrice && totalPrice > 0 && (
                        <Button variant="outlined" textId="addToCart" onClick={addToCart} />
                    )}
                </RightPanel>
            </CardContent>
        </Card>
    );
};
