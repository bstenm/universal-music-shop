import { useTheme } from '@mui/material';
import LibBounceLoader from 'react-spinners/BounceLoader';

type Props = {
    size?: number;
    color?: string;
};

export const BounceLoader = ({ size, color }: Props): JSX.Element => {
    const theme = useTheme();

    return (
        <LibBounceLoader color={color ?? theme.palette.secondary.dark} loading size={size ?? 60} />
    );
};
