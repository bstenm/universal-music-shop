// import { nanoid } from 'nanoid';
import { useState } from 'react';

import { log } from 'libs/logger';
import { useAlert } from 'hooks/useAlert';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { userActions } from 'state/user/userSlice';

type ReturnType = [() => Promise<void>, boolean];

export const useLogin = (): ReturnType => {
    const dispatch = useAppDispatch();

    const { errorAlert } = useAlert();

    const [loading, setLoading] = useState<boolean>(false);

    const login = async (): Promise<void> => {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                dispatch(userActions.setInfo({ id: '123' }));
                // dispatch(userActions.setInfo({ id: nanoid() }));
            }, 2000);
            // Set global state user data
        } catch (e) {
            setLoading(false);
            errorAlert('loginError');
            log.error(e);
        }
    };

    return [login, loading];
};
