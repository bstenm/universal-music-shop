import { ErrorOccured } from 'components/ErrorOccured';
import { EmptyResponse } from 'components/EmptyResponse';
import { CenteredLoader } from 'components/CenteredLoader';

type Props = {
    empty: boolean;
    children: JSX.Element;
    fetching: boolean;
    error?: boolean;
    errorMessage?: string;
    emptyMessage?: string;
};

/**
 * A component that will display a loader on action pending, an error message
 * on action error, an empty message when there is nothing to display or its children
 */
export const FetchingScreen = ({
    error,
    empty,
    children,
    fetching,
    errorMessage,
    emptyMessage
}: Props): JSX.Element => {
    if (fetching) {
        return <CenteredLoader fullscreen />;
    }

    if (error) {
        return <ErrorOccured fullscreen message={errorMessage} />;
    }

    if (!error && empty) {
        return <EmptyResponse fullscreen message={emptyMessage} />;
    }

    return children;
};
