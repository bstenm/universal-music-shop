import { styled } from '@mui/material/styles';
import { CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { ProductList } from 'components/ProductList';
import { useMarketplace } from 'hooks/useMarketplace';
import { Button as CustomButton } from 'components/Button';
import { IMarketItem } from 'interfaces';

const Button = styled(CustomButton)`
    margin: auto;
`;

/**
 * The UMG shop: All items are displayed here with ability to redirect to an item detail page
 */
export const Marketplace = (): JSX.Element => {
    // Get the status of the request to get all pructs from the store,
    // the result of the request and the callback for when the user wants to see a product details
    const { items, status, onSelect } = useMarketplace();

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
