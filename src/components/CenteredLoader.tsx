import { Centered } from 'components/Centered';
import { BounceLoader } from 'components/BounceLoader';

type Props = {
    fullscreen?: boolean;
};

/**
 * The bouncing loader that can be centered
 */
export const CenteredLoader = ({ fullscreen }: Props): JSX.Element => {
    return (
        <Centered fullscreen={fullscreen}>
            <BounceLoader />
        </Centered>
    );
};
