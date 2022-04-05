import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Container = styled(Stack)`
    height: 50px;
    color: ${grey[800]};
`;

export const DataRow = ({ children }: Props): JSX.Element => {
    return (
        <Container direction="row" spacing={1} alignItems="center">
            {children}
        </Container>
    );
};
