import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { Asset } from 'components/Asset';
import { IMarketItem } from 'interfaces';
import { getProducts } from 'state/products/selectors';
import { FetchingScreen } from 'components/FetchingScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchAllProducts } from 'state/products/productsSlice';

export const Marketplace = (): JSX.Element => {
    const history = useHistory();

    const dispatch = useAppDispatch();

    const { items, status } = useAppSelector(getProducts);

    const onSelect = (itemId: string | number): void => {
        history.push(`/market-item/${itemId}`);
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <FetchingScreen
            empty={!items.length}
            error={status === 'failed'}
            fetching={status === 'pending'}
            errorMessage="getAllMarketItemsError">
            <Grid sx={{ marginTop: '30px' }} container spacing={4}>
                {items
                    // Let's not display the white T-shirt as we'll use it as the featured item in the cart for demo
                    .filter((item: IMarketItem) => !item.title.includes('white'))
                    .map((item: IMarketItem) => (
                        <Grid key={item.id} item xs={6} md={4} xl={3}>
                            <Asset data={item} onSelect={() => onSelect(item.id)} />
                        </Grid>
                    ))}
            </Grid>
        </FetchingScreen>
    );
};
