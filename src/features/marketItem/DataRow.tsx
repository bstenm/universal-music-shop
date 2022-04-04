import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Container = styled(Stack)`
    height: 50px;
`;

export const DataRow = ({ children }: Props): JSX.Element => {
    return (
        <Container direction="row" spacing={1} alignItems="center">
            {children}
        </Container>
    );
};
