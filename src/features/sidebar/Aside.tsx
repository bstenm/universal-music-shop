import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { GiTicket } from 'react-icons/gi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-pro-sidebar/dist/css/styles.css';

import { SidebarTitle } from 'features/sidebar/SidebarTitle';
import { getUserData } from 'state/user/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
import { SidebarUserOverview } from 'features/sidebar/SidebarUserOverview';
import { Capitalize } from 'components/Capitalize';

const Item = styled(MenuItem)(
    ({ theme }) => `
    border-radius: 5px;
    &:hover {
        background: ${theme.palette.secondary.dark};
    }
`
);

type Props = {
    toggled: boolean;
    collapsed: boolean;
    handleToggleSidebar: (value: boolean) => void;
};

export const Aside = ({ toggled, collapsed, handleToggleSidebar }: Props): JSX.Element => {
    const userData = useAppSelector(getUserData);

    return (
        <ProSidebar
            toggled={toggled}
            collapsed={collapsed}
            breakPoint="md"
            onToggle={handleToggleSidebar}>
            <SidebarHeader>
                <SidebarTitle collapsed={collapsed} />
            </SidebarHeader>
            {userData.name && (
                <SidebarHeader>
                    <SidebarUserOverview name={userData.name} avatar={userData.avatar} />
                </SidebarHeader>
            )}
            <PerfectScrollbar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <Item icon={<LocalGroceryStoreIcon />}>
                            <Link to="/marketplace">
                                <Capitalize all variant="body2" message="marketplace" />
                            </Link>
                        </Item>
                        <Item icon={<GiTicket fontSize={22} />}>
                            <Link to={`/my-purchases/${userData.id}`}>
                                <Capitalize all variant="body2" message="myPurchases" />
                            </Link>
                        </Item>
                    </Menu>
                </SidebarContent>
            </PerfectScrollbar>
        </ProSidebar>
    );
};
