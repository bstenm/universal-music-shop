import { grey } from '@mui/material/colors';
import { Capitalize } from 'components/Capitalize';

type Props = {
    name: string;
};

export const RowLabel = ({ name }: Props): JSX.Element => {
    return <Capitalize message={name} color={grey[400]} />;
};
