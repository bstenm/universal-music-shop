import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material';
import { GrDropbox } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';

import { Centered } from 'components/Centered';

const Icon = styled(GrDropbox)`
    top: 2px;
    left: -8px;
    position: relative;
`;

type Props = {
    message?: string;
    fullscreen?: boolean;
};

export const EmptyResponse = ({ message, fullscreen }: Props): JSX.Element => {
    const theme = useTheme();

    const { t } = useTranslation();

    return (
        <Centered fullscreen={fullscreen}>
            <Typography variant="h5" color={theme.palette.secondary.dark}>
                <Icon /> {t(message ?? 'noItemsFound')}
            </Typography>
        </Centered>
    );
};
