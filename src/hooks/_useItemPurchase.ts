import { useState } from 'react';

import { log } from 'libs/logger';
import { useAlert } from 'hooks/useAlert';
import { getUserId } from 'state/user/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
import { DatabaseService } from 'services/DatabaseService';
import { IPurchasedItem } from 'config/types';
import { useHistory } from 'react-router-dom';

type ReturnType = [(data: IPurchasedItem) => Promise<void>, boolean];

export const useItemPurchase = (hideSuccessMessage?: boolean): ReturnType => {
    const userId: string = useAppSelector(getUserId);

    const history = useHistory();

    const { errorAlert, successAlert } = useAlert();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const processItemPurchase = async (itemData: IPurchasedItem): Promise<void> => {
        try {
            if (!itemData || !itemData.quantity) return;
            await DatabaseService.addToUserAssets(userId, itemData);
            if (!hideSuccessMessage) {
                successAlert('successfulPurchase');
            }
            history.push(`/my-purchases/${userId}`);
        } catch (e) {
            errorAlert('addToUserAssetsError');
            log.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    return [processItemPurchase, submitting];
};
