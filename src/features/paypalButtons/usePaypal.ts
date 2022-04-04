import { useState } from 'react';
import { OrderResponseBody } from '@paypal/paypal-js/types/apis/orders';
import {
    OnApproveData,
    OnApproveActions,
    CreateOrderActions
} from '@paypal/paypal-js/types/components/buttons';

import { log } from 'libs/logger';
import { useAlert } from 'hooks/useAlert';

type ReturnType = {
    onError: (e: unknown) => void;
    onCancel: () => void;
    onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void>;
    createOrder: (_: unknown, actions: CreateOrderActions) => Promise<string>;
    processing: boolean;
};

type Args = {
    currency: string;
    amount: number;
    onSuccess: () => void;
};

export const usePaypal = ({ currency, amount, onSuccess }: Args): ReturnType => {
    const [processing, setProcessing] = useState<boolean>(false);

    const { errorAlert, successAlert } = useAlert();

    const onError = (e: unknown): void => {
        setProcessing(false);
        errorAlert('purchaseError');
        log.error(e);
    };

    const onCancel = (): void => {
        setProcessing(false);
        errorAlert('purchaseCanceled');
    };

    const createOrder = async (_: unknown, actions: CreateOrderActions): Promise<string> => {
        setProcessing(true);

        return actions.order.create({
            purchase_units: [
                {
                    description: 'Market Item',
                    amount: {
                        currency_code: currency,
                        value: amount.toString()
                    }
                }
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        });
    };

    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        onSuccess();
        setProcessing(false);
        successAlert('successfulPurchase');
        const details: OrderResponseBody | undefined = await actions.order?.capture();
        log.debug('Paypal Transaction completed', details, JSON.stringify(data, null, 2));
    };

    return { createOrder, onApprove, onCancel, onError, processing };
};
