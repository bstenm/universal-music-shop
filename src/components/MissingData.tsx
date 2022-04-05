import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type Props = {
    message: string;
};

export const MissingData = ({ message }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Typography variant="body2" color={grey[600]}>
            <i> {t(message)}</i>
        </Typography>
    );
};
