import { Space } from 'components/Space';
import { Spinner } from 'components/Spinner';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type Props = {
    message: string;
};

export const SpinnerWithMessage = ({ message }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="body2" color="#555">
                {t(message)}
            </Typography>
            <Space height="10px" />
            <Spinner />
        </>
    );
};
