import yellow from '@mui/material/colors/yellow';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { DataRow } from 'features/marketItem/DataRow';
import { RowLabel } from 'features/marketItem/RowLabel';
import { CustomSelect } from 'features/marketItem/CustomSelect';

const FullyBooked = styled('i')`
    color: ${yellow[400]};
`;

type Props = {
    range?: number;
    onSelect: (value: number) => void;
};

export const ItemQuantity = ({ range, onSelect }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <DataRow>
            <RowLabel name="quantity" />:
            {range && range > 0 ? (
                <CustomSelect type="quantity" max={range} onSelect={onSelect} />
            ) : (
                <FullyBooked>{t('fullyBooked')}</FullyBooked>
            )}
        </DataRow>
    );
};
