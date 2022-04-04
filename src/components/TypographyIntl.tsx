import MuiTypography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentProps<typeof MuiTypography> & {
    textId: string;
};

export const TypographyIntl = ({ textId, ...props }: Props): JSX.Element => {
    const { t } = useTranslation();

    return <MuiTypography {...props}>{t(textId)}</MuiTypography>;
};
