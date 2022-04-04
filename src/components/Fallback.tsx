import { styled } from '@mui/material/styles';

import { BounceLoader } from 'components/BounceLoader';

const Container = styled('div')`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #40373e;
`;

export const Fallback = (): JSX.Element => (
    <Container>
        <BounceLoader />
    </Container>
);
