import { useState } from 'react';
import { styled } from '@mui/material/styles';

import { Main } from 'components/Main';
import { Aside } from 'features/sidebar/Aside';

const Container = styled('div')`
    height: 100%;
    display: flex;
`;

export const Layout = (): JSX.Element => {
    const [toggled, setToggled] = useState<boolean>(false);

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const handleCollapsedChange = (checked: boolean): void => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value: boolean): void => {
        setToggled(value);
    };

    return (
        <Container>
            <Aside
                toggled={toggled}
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
            />
            <Main
                collapsed={collapsed}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
            />
        </Container>
    );
};
