import Stack from '@mui/material/Stack';
import { Redirect } from 'react-router-dom';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useLogin } from 'hooks/useLogin';
import { getUserData } from 'state/user/selectors';
import { TypographyIntl } from 'components/TypographyIntl';
import { useAppSelector } from 'hooks/useAppSelector';

export const Auth = (): JSX.Element => {
    const [login, loggingIn] = useLogin();

    const user = useAppSelector(getUserData);

    if (user.id) {
        return <Redirect from="/" to="/marketplace" />;
    }

    if (loggingIn) {
        return (
            <Stack spacing={2} alignItems="center">
                <TypographyIntl variant="body2" color="primary.light" textId="loggingIn" />
                <Spinner />
            </Stack>
        );
    }

    return <Button onClick={login} disableElevation variant="contained" textId="login" />;
};
