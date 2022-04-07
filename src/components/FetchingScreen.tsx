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
