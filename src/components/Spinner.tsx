import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

type Props = {
    size?: number;
};

export const Spinner = ({ size }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) => theme.palette.secondary.light
                }}
                size={size ?? 17}
                thickness={6}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => theme.palette.secondary.main,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round'
                    }
                }}
                size={size ?? 17}
                thickness={6}
            />
        </Box>
    );
};
