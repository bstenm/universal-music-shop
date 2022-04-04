import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { userActions } from 'state/user/userSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/useAppDispatch';

type Props = {
    name?: string;
    avatar?: string;
};

export const SidebarUserOverview = ({ avatar = '', name = '' }: Props): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const logout = (): void => {
        // Log out from torus service
        dispatch(userActions.reset());
        // Then force a window refresh so the Torus service get initialised again in App useEffect.
        // It also reset the user's global state data
        window.location.href = '/';
    };

    return (
        <Menu iconShape="circle">
            <SubMenu title={name} icon={<Avatar alt={name} src={avatar} />}>
                <MenuItem icon={<AccountCircleIcon />}>
                    <Link to="/profile">{t('myProfile')}</Link>
                </MenuItem>
                <MenuItem icon={<EditIcon />}>
                    <Link to="/edit-profile">{t('editProfile')}</Link>
                </MenuItem>
                <MenuItem onClick={logout} icon={<ExitToAppIcon />}>
                    {t('logout')}
                </MenuItem>
            </SubMenu>
        </Menu>
    );
};
