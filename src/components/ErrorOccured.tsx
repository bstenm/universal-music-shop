import { BiErrorCircle } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Centered } from 'components/Centered';

const Icon = styled(BiErrorCircle)`
    top: 2px;
    left: -8px;
    position: relative;
`;

type Props = {
    message?: string;
    fullscreen?: boolean;
};

/**
 * Standard design for error messge that can be centered
 */
export const ErrorOccured = ({ message, fullscreen }: Props): JSX.Element => {
    const theme = useTheme();

    const { t } = useTranslation();

    return (
        <Centered fullscreen={fullscreen}>
            <Typography variant="h5" color={theme.palette.error.dark}>
                <Icon /> {t(message ?? 'unexpectedError')}
            </Typography>
        </Centered>
    );
};
