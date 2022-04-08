import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { ICartItem } from 'interfaces';
import { ProductList } from 'components/ProductList';
import { useAppSelector } from 'hooks/useAppSelector';
import { getUserPurchases } from 'state/user/selectors';

export const UserPurchases = (): JSX.Element => {
    const purchases = useAppSelector(getUserPurchases);

    return (
        <ProductList<ICartItem> items={purchases}>
            {(item: ICartItem) => (
                <>
                    <CardContent>
                        <Typography gutterBottom variant="body1" align="center">
                            {item.title}
                        </Typography>
                        <Typography gutterBottom variant="body2" align="center">
                            {item.description}
                        </Typography>
                        <Typography gutterBottom align="center" color="secondary.dark" variant="h6">
                            {item.quantity} item{item.quantity > 1 ? 's' : ''}
                        </Typography>
                    </CardContent>
                </>
            )}
        </ProductList>
    );
};
