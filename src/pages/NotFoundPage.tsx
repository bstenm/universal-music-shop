import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Container = styled('div')`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledTypography = styled(Typography)(({ theme }) => {
    const color = theme.palette.primary.dark;
    return {
        color,
        width: '250px',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${color}`,
        borderRadius: 125
    };
});

export const NotFoundPage = (): JSX.Element => {
    return (
        <Container>
            <StyledTypography variant="h1">404</StyledTypography>
        </Container>
    );
};
