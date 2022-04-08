import MuiButton from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

import { Spinner } from 'components/Spinner';

type Props = React.ComponentProps<typeof MuiButton> & {
    textId: string;
    loading?: boolean;
};
/**
 * The mui button component with automatic internationalization and loading logic
 */
export const Button = ({ textId, loading, ...props }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <MuiButton {...props} disabled={loading}>
            {loading ? <Spinner dark /> : t(textId)}
        </MuiButton>
    );
};
