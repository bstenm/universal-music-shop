import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { ChangeEvent } from 'react';

const Container = styled('div')(({ theme }) => ({
    color: theme.palette.primary.light,
    '& .MuiSwitch-thumb': {
        color: theme.palette.primary.light,
        opacity: 0.8
    },
    [theme.breakpoints.down('md')]: {
        marginTop: 5,
        marginLeft: 10
    }
}));

type Props = {
    collapsed: boolean;
    onToggle: (value: boolean) => void;
};

/**
 * The icon button that gives the ability to collapse the sidebar menu
 */
export const CollapseSidebarButton = ({ collapsed, onToggle }: Props): JSX.Element => {
    const onChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        onToggle(checked);
    };

    return (
        <Container>
            <Switch color="secondary" size="small" checked={collapsed} onChange={onChange} />
        </Container>
    );
};
