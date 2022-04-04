import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import logo from 'assets/logo.png';
import { siteTitle } from 'config';
import logoCollapsed from 'assets/logo-collapsed.png';

const StyledLink = styled(Link)`
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

type Props = {
    collapsed: boolean;
};

export const SidebarTitle = ({ collapsed }: Props): JSX.Element => (
    <StyledLink to="/">
        <Stack alignItems="center" direction="row" spacing={3}>
            {collapsed ? (
                <img src={logoCollapsed} alt={siteTitle} width="80px" />
            ) : (
                <img src={logo} alt={siteTitle} width="220px" />
            )}
        </Stack>
    </StyledLink>
);
