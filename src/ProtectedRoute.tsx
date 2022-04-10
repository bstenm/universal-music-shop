import { Redirect, Route } from 'react-router-dom';

import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'hooks/useAppSelector';

type Props = {
    path: string;
    component: React.ElementType;
};

/**
 * Component that insures an authenticated can not access a specific route
 */
export const ProtectedRoute = ({ component: Component, path }: Props): JSX.Element => {
    const loggedIn = useAppSelector(isUserLoggedIn);

    return (
        <Route
            path={path}
            render={(props) =>
                loggedIn === true ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
