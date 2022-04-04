import { EmptyResponse } from 'components/EmptyResponse';
import { CenteredLoader } from 'components/CenteredLoader';

type Props = {
    children: JSX.Element;
    fetching: boolean;
    message?: string;
    empty: boolean;
};

export const FetchingScreen = ({ children, fetching, message, empty }: Props): JSX.Element => {
    if (fetching) {
        return <CenteredLoader fullscreen />;
    }

    if (empty) {
        return <EmptyResponse fullscreen message={message} />;
    }

    return children;
};
