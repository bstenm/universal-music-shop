import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type Props = {
    type?: AlertColor;
    message?: string;
    onClose: () => void;
};

export const AlertSnackbar = ({ type, message, onClose }: Props): JSX.Element => {
    return (
        <Snackbar
            open={!!message}
            autoHideDuration={10000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={type || 'error'} elevation={0}>
                {message}
            </Alert>
        </Snackbar>
    );
};
