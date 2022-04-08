import capitalize from 'lodash/capitalize';
import startCase from 'lodash/startCase';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

type Props = React.ComponentProps<typeof Typography> & {
    message: string;
    all?: boolean;
};

/**
 * Capitalize the message passed with automatic translation
 */
export const Capitalize = ({ message, all, ...props }: Props): JSX.Element => {
    const { t } = useTranslation();

    const transform = all ? startCase : capitalize;

    return <Typography {...props}>{transform(t(message))}</Typography>;
};
