import { Centered } from 'components/Centered';
import { BounceLoader } from 'components/BounceLoader';

type Props = {
    fullscreen?: boolean;
};

export const CenteredLoader = ({ fullscreen }: Props): JSX.Element => {
    return (
        <Centered fullscreen={fullscreen}>
            <BounceLoader />
        </Centered>
    );
};
