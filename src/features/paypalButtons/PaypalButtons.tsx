// TODO: error handling
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer
} from '@paypal/react-paypal-js';

import { usePaypal } from 'features/paypalButtons/usePaypal';
import { CenteredSpinner } from 'components/CenteredSpinner';

type Props = {
    amount: number;
    onPaymentCompleted: () => void;
};

type ButtonWrapperProps = {
    amount: number;
    currency: string;
    onSuccess: () => void;
};

const ButtonWrapper = ({ amount, currency, onSuccess }: ButtonWrapperProps): JSX.Element => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ isPending }] = usePayPalScriptReducer();

    const { createOrder, onApprove, onCancel, onError, processing } = usePaypal({
        currency,
        amount,
        onSuccess
    });

    return (
        <>
            {(isPending || processing) && <CenteredSpinner />}
            <PayPalButtons
                style={{ layout: 'vertical' }}
                onError={onError}
                onCancel={onCancel}
                onApprove={onApprove}
                createOrder={createOrder}
                forceReRender={[amount, currency]}
            />
        </>
    );
};

export const PaypalButtons = ({ amount, onPaymentCompleted }: Props): JSX.Element => {
    return (
        <PayPalScriptProvider
            options={{
                // TODO: Add ability to change currency
                currency: 'USD',
                'client-id': 'test',
                components: 'buttons'
            }}>
            <ButtonWrapper
                amount={amount}
                // TODO: Add ability to change currency
                currency="USD"
                onSuccess={onPaymentCompleted}
            />
        </PayPalScriptProvider>
    );
};
