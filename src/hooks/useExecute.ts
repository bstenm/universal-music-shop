import { useState } from 'react';

import { log } from 'libs/logger';
import { useAlert } from 'hooks/useAlert';

type Args<T> = {
    errorMessage: string;
    request: () => Promise<T>;
};

type ReturnType<T> = [() => Promise<void>, T | undefined, boolean];

export const useExecute = <T>({ errorMessage, request }: Args<T>): ReturnType<T> => {
    const { errorAlert } = useAlert();

    const [result, setResult] = useState<T>();

    const [fetching, setFetching] = useState<boolean>(false);

    const execute = async (): Promise<void> => {
        try {
            setFetching(true);
            setResult(await request());
        } catch (e) {
            errorAlert(errorMessage);
            log.error(e);
        } finally {
            setFetching(false);
        }
    };

    return [execute, result, fetching];
};
