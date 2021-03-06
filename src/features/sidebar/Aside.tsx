import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { FaTshirt } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { IoMdContacts } from 'react-icons/io';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-pro-sidebar/dist/css/styles.css';

import { SidebarTitle } from 'features/sidebar/SidebarTitle';
import { getUserData } from 'state/user/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
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

    // Redirects to the external UMG site
    const toUMGSite = (): void => {
        window.location.href = 'https://umg.kord.space';
    };

    return (
        <ProSidebar
            toggled={toggled}
            collapsed={collapsed}
            breakPoint="md"
            onToggle={handleToggleSidebar}>
            <SidebarHeader onClick={toUMGSite}>
                <SidebarTitle collapsed={collapsed} />
            </SidebarHeader>
            <PerfectScrollbar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <Item onClick={toUMGSite} icon={<ImHome fontSize={22} />}>
                            <Capitalize all variant="body2" message="home" />
                        </Item>
                        <Item icon={<LocalGroceryStoreIcon />}>
                            <Link to="/marketplace">
                                <Capitalize all variant="body2" message="marketplace" />
                            </Link>
                        </Item>
                        <Item icon={<FaTshirt fontSize={22} />}>
                            <Link to={`/my-purchases/${userData.id}`}>
                                <Capitalize all variant="body2" message="myPurchases" />
                            </Link>
                        </Item>
                        <Item onClick={toUMGSite} icon={<IoMdContacts fontSize={22} />}>
                            <Capitalize all variant="body2" message="contact" />
                        </Item>
                    </Menu>
                </SidebarContent>
            </PerfectScrollbar>
        </ProSidebar>
    );
};
