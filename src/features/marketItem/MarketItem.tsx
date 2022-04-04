import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import MuiCardContent from '@mui/material/CardContent';
import { useState, useRef } from 'react';

import { Space } from 'components/Space';
import { DEV_MODE } from 'config/constants';
import { EmptyResponse } from 'components/EmptyResponse';
import { CenteredLoader } from 'components/CenteredLoader';
import { useFetchMarketItem } from 'hooks/useFetchMarketItem';
import { useItemPurchase } from 'hooks/useItemPurchase';
import { TotalPrice } from 'features/marketItem/TotalPrice';
import { ItemQuantity } from 'features/marketItem/ItemQuantity';
import { PaypalButtons } from 'features/paypalButtons/PaypalButtons';

const Card = styled(MuiCard)(({ theme }) => ({
    color: 'white',
    margin: 'auto',
    padding: theme.spacing(2),
    maxWidth: '91ch',
    borderRadius: '5px',
    backgroundColor: theme.palette.primary.main
}));

const CardContent = styled(MuiCardContent)`
    display: flex;
`;

const Booking = styled('div')`
    width: 100%;
    display: flex;
    padding-left: 30px;
    flex-direction: column;
    justify-content: space-between;
`;

export const MarketItem = (): JSX.Element => {
    const quantityRef = useRef<number>(1);

    const { itemId } = useParams<{ itemId: string }>();

    const [quantity, setQuantity] = useState<number>(1);

    const [processItemPurchase] = useItemPurchase();

    const [item, loading] = useFetchMarketItem(itemId);

    // We need that to keep track of the quantity selected by the user
    // because we are using it in a callback passed to a child component
    quantityRef.current = quantity;

    const onSelectQuantity = (value: number): void => {
        setQuantity(value);
    };

    if (loading) {
        return <CenteredLoader fullscreen />;
    }

    if (!item) {
        return <EmptyResponse message="itemNotFound" />;
    }

    const { image, price } = item;

    // TODO: change hardcoded tier value
    const totalPrice = parseInt(price, 10) * quantity;

    return (
        <Card>
            <CardContent>
                <div>
                    <img src={image} alt="T-shirt" />
                </div>
                <Booking>
                    <ItemQuantity range={10} onSelect={onSelectQuantity} />
                    <TotalPrice data={totalPrice} />
                    <Space height="20px" />
                    {totalPrice && totalPrice > 0 && (
                        <PaypalButtons
                            // TODO: replace hard-coded total price
                            amount={DEV_MODE ? 1 : totalPrice}
                            onPaymentCompleted={() =>
                                processItemPurchase({ ...item, quantity: quantityRef.current })
                            }
                        />
                    )}
                </Booking>
            </CardContent>
        </Card>
    );
};
