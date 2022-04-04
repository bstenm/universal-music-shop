import { styled } from '@mui/material/styles';

import logo from 'assets/logo.png';
import { siteTitle } from 'config';

const Container = styled('div')`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #555;
`;

export const Fallback = (): JSX.Element => (
    <Container>
        <img src={logo} alt={siteTitle} width="220px" />
    </Container>
);
