import { useTranslation } from 'react-i18next';

import { alertActions } from 'state/alert/alertSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';

// Allows to open a snacknar alert from anywhere in the app
// This alert is embedded is the layout
export const useAlert = (): {
    errorAlert: (messageId?: string | undefined) => void;
    successAlert: (messageId?: string | undefined) => void;
    closeAlert: () => void;
} => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const openAlert = (messageId?: string, type?: string): void => {
        const ms = t(messageId ?? 'unexpectedError') ?? t('unexpectedError');
        dispatch(alertActions.open({ message: ms, type }));
    };

    const errorAlert = (messageId?: string): void => openAlert(messageId, 'error');

    const successAlert = (messageId?: string): void => openAlert(messageId, 'success');

    const closeAlert = (): void => {
        dispatch(alertActions.close());
    };

    return { errorAlert, successAlert, closeAlert };
};
