import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Space } from 'components/Space';
import { Button } from 'components/Button';
import { currency } from 'config';
import { CustomSelect } from 'components/CustomSelect';
import { useMarketItemOrder } from 'hooks/useMarketItemOrder';

type Props = {
    productId: string | number;
};

const TotalPrice = styled('div')(
    ({ theme }) => `
    color: ${theme.palette.secondary.dark};
`
);

const Title = styled('div')(
    ({ theme }) => `
    color: ${theme.palette.primary.main};
    border-bottom: 1px solid ${theme.palette.primary.main};
`
);

export const FeaturedProduct = ({ productId }: Props): JSX.Element => {
    const { t } = useTranslation();

    const { item, totalPrice, addToCart, selectQuantity } = useMarketItemOrder(productId);

    // TODO: remove hard-coded
    const range = 10;

    if (!item || !range || range < 1) return <div />;

    return (
        <Stack spacing={1}>
            <Title>
                <Typography variant="h6">{t('featured')}</Typography>
            </Title>
            <Stack direction="row" spacing={3} alignItems="center">
                <img src={item.image} width="150px" alt={item.description} />
                <Stack>
                    <Typography variant="h6" color="primary">
                        {item.description}
                    </Typography>
                    <Typography variant="body1" color="primary">
                        {item.title}
                    </Typography>
                    <Space height="15px" />
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <CustomSelect type="quantity" max={range} onSelect={selectQuantity} />
                        <TotalPrice>
                            {currency}
                            {totalPrice}
                        </TotalPrice>
                        {totalPrice && totalPrice > 0 && (
                            <Button
                                sx={{ backgroundColor: grey[800] }}
                                size="small"
                                textId="add"
                                variant="contained"
                                onClick={addToCart}
                                disableElevation
                            />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
