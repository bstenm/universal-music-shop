import { styled } from '@mui/material/styles';
import { TypographyIntl } from 'components/TypographyIntl';

const Container = styled('div')`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Typography = styled(TypographyIntl)(({ theme }) => {
    const color = theme.palette.primary.dark;
    return {
        color,
        width: '250px',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
});

export const SomethingWentWrongPage = (): JSX.Element => {
    return (
        <Container>
            <Typography variant="h1" textId="somethingWentWrong" />
        </Container>
    );
};
