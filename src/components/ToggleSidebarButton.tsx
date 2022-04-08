import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const Container = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: 35,
    height: 35,
    color: '#353535',
    textAlign: 'center',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'flex'
    }
}));

type Props = {
    toggle: (value: boolean) => void;
};

/**
 * The icon button to toggle the sidebar menu
 */
export const ToggleSidebarButton = ({ toggle }: Props): JSX.Element => (
    <Container onClick={() => toggle(true)}>
        <MenuIcon color="secondary" />
    </Container>
);
