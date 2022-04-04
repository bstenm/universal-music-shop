import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { log } from 'libs/logger';

const Container = styled('div')`
    gap: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TestPage = (): JSX.Element => {
    const [value, setValue] = useState<number>(0);

    const incrementValue = (): void => {
        setValue(value + 1);
    };

    const executeSth = (): void => {
        log.debug(value);
    };

    return (
        <Container>
            <h3 style={{ color: '#FFF' }}>{value}</h3>
            <Button variant="contained" onClick={incrementValue}>
                Increment
            </Button>
            <Button variant="contained" onClick={executeSth}>
                Execute
            </Button>
        </Container>
    );
};
