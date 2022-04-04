import { styled } from '@mui/material/styles';

import { Auth } from 'features/auth/Auth';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 90px);
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #fff;
    z-index: 1010;
    opacity: 0.6;
`;

const AuthFlow = styled('div')`
    z-index: 1020;
`;

export const AuthPage = (): JSX.Element => (
    <Container>
        <Backdrop />
        <AuthFlow>
            <Auth />
        </AuthFlow>
    </Container>
);
