import { Grid } from '@mui/material';

import { Product } from 'components/Product';
import { FetchingScreen } from 'components/FetchingScreen';
import { ProductListItem } from 'interfaces';

type Props<T> = {
    items: T[];
    children: (item: T) => React.ReactNode;
    error?: boolean;
    fetching?: boolean;
    errorMessage?: string;
};

export const ProductList = <T extends ProductListItem>({
    items,
    error,
    fetching,
    errorMessage,
    children
}: Props<T>): JSX.Element => {
    return (
        <FetchingScreen
            error={error}
            empty={!items.length}
            fetching={fetching || false}
            errorMessage={errorMessage}>
            <Grid sx={{ marginTop: '30px' }} container spacing={4}>
                {items.map((item: T) => (
                    <Grid key={item.id} item xs={6} md={4} xl={3}>
                        <Product image={item.image}>{children(item)}</Product>
                    </Grid>
                ))}
            </Grid>
        </FetchingScreen>
    );
};
