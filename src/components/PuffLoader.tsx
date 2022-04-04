import { useTheme } from '@mui/material';
import LibPuffLoader from 'react-spinners/PuffLoader';

type Props = {
    size?: number;
    color?: string;
};

export const PuffLoader = ({ size, color }: Props): JSX.Element => {
    const theme = useTheme();

    return (
        <LibPuffLoader color={color ?? theme.palette.secondary.main} loading size={size ?? 30} />
    );
};
