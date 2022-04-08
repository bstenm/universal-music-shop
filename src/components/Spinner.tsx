import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

type Props = {
    size?: number;
    dark?: boolean;
};

export const Spinner = ({ size, dark }: Props): JSX.Element => {
    const colorType = dark ? 'primary' : 'secondary';

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
                    color: (theme) => theme.palette[colorType].light
                }}
                size={size ?? 17}
                thickness={6}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => theme.palette[colorType].main,
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
