import { styled } from '@mui/material/styles';
import { currency } from 'config';
import { DataRow } from 'features/marketItem/DataRow';
import { Capitalize } from 'components/Capitalize';
import { MissingData } from 'components/MissingData';

type Props = {
    data?: number;
};

const Value = styled('div')(
    ({ theme }) => `
    color: ${theme.palette.secondary.dark};
`
);

export const TotalPrice = ({ data }: Props): JSX.Element => (
    <DataRow>
        <Capitalize message="totalPrice" />:{' '}
        {data ? (
            <Value>
                {currency}
                {data}
            </Value>
        ) : (
            <MissingData message="missingPrice" />
        )}
    </DataRow>
);
