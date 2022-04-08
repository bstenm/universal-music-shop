import Button from '@mui/material/Button';
import { ImCreditCard } from 'react-icons/im';

import { Spinner } from 'components/Spinner';

type Props = {
    loading?: boolean;
    price: number;
    onCheckout: () => void;
};

/**
 * The shopping cart checkout button: for saving the items purchased
 * to the user state and redirecting to the user purchases page
 */
export const CheckoutButton = ({ loading, price, onCheckout }: Props): JSX.Element => {
    return (
        <Button
            sx={(theme) => ({ backgroundColor: theme.palette.secondary.dark })}
            variant="contained"
            onClick={onCheckout}
            endIcon={<ImCreditCard />}
            disabled={loading}>
            {loading ? <Spinner dark /> : `$${price}`}
        </Button>
    );
};
