import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Asset } from 'components/Asset';
import { FetchingScreen } from 'components/FetchingScreen';
import { useFetchAllMarketItems } from 'hooks/useFetchAllMarketItems';
import { IMarketItem } from 'config/types';

export const Marketplace = (): JSX.Element => {
    const history = useHistory();

    const [items] = useFetchAllMarketItems();

    const onSelect = (itemId: string | number): void => {
        history.push(`/market-item/${itemId}`);
    };

    return (
        <FetchingScreen fetching={!items} empty={!items.length}>
            <Grid sx={{ marginTop: '30px' }} container spacing={4}>
                {items.map((item: IMarketItem) => (
                    <Grid key={item.id} item xs={6} md={4} xl={3}>
                        <Asset data={item} onSelect={() => onSelect(item.id)} />
                    </Grid>
                ))}
            </Grid>
        </FetchingScreen>
    );
};
