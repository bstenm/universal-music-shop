import { getErrorMessage } from 'libs/getErrorMessage';

export const handleTorusError = (e: unknown): string | null => {
    const error = getErrorMessage(e);
    if (error.code === 4001) {
        return 'transactionCancelled';
    }
    return null;
};
