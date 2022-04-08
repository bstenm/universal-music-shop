import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardActions } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProductList } from 'components/ProductList';
import { getProducts } from 'state/products/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchAllProducts } from 'state/products/productsSlice';
import { Button as CustomButton } from 'components/Button';
import { IMarketItem } from 'interfaces';

const Button = styled(CustomButton)`
    margin: auto;
`;

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
        <ProductList<IMarketItem>
            items={items}
            error={status === 'failed'}
            fetching={status === 'pending'}
            errorMessage="getAllMarketItemsError">
            {(item: IMarketItem) => (
                <>
                    <CardContent>
                        <Typography gutterBottom variant="body1" align="center">
                            {item.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            onClick={() => onSelect(item.id)}
                            textId="viewDetails"
                        />
                    </CardActions>
                </>
            )}
        </ProductList>
    );
};
