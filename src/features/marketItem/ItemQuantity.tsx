import yellow from '@mui/material/colors/yellow';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { DataRow } from 'features/marketItem/DataRow';
import { Capitalize } from 'components/Capitalize';
import { CustomSelect } from 'components/CustomSelect';

const OutOfStock = styled('i')`
    color: ${yellow[400]};
`;

type Props = {
    range?: number;
    onSelect: (value: number) => void;
};

/**
 * Gives the ability to the user to select a quantity for this item
 */
export const ItemQuantity = ({ range, onSelect }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <DataRow>
            <Capitalize message="quantity" />:
            {range && range > 0 ? (
                <CustomSelect type="quantity" max={range} onSelect={onSelect} />
            ) : (
                <OutOfStock>{t('outOfStock')}</OutOfStock>
            )}
        </DataRow>
    );
};
