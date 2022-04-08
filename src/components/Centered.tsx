import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    fullscreen?: boolean;
};

const Container = styled('div')<{ fullscreen?: string }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

/**
 * Component that gives the ability to center its children in the page
 */
export const Centered = ({ children, fullscreen }: Props): JSX.Element => {
    return <Container fullscreen={fullscreen ? 'true' : 'false'}>{children}</Container>;
};
