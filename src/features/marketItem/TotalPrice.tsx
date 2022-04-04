import { currency } from 'config';
import { DataRow } from 'features/marketItem/DataRow';
import { RowLabel } from 'features/marketItem/RowLabel';
import { MissingData } from 'components/MissingData';

type Props = {
    data?: number;
};

export const TotalPrice = ({ data }: Props): JSX.Element => (
    <DataRow>
        <RowLabel name="totalPrice" />:{' '}
        {data ? (
            <div>
                {currency}
                {data}
            </div>
        ) : (
            <MissingData message="missingPrice" />
        )}
    </DataRow>
);
