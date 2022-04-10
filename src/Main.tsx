import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { AuthPage } from 'pages/AuthPage';
import { CartButton } from 'features/topBar/CartButton';
import { NotFoundPage } from 'pages/NotFoundPage';
import { UserPurchasesPage } from 'pages/UserPurchasesPage';
import { LanguageSelect } from 'features/languageSelect/LanguageSelect';
import { ProtectedRoute } from 'ProtectedRoute';
import { MarketItemPage } from 'pages/MarketItemPage';
import { MarketplacePage } from 'pages/MarketplacePage';
import { ToggleSidebarButton } from 'features/topBar/ToggleSidebarButton';
import { CollapseSidebarButton } from 'features/topBar/CollapseSidebarButton';
import { SomethingWentWrongPage } from 'pages/SomethingWentWrongPage';

const Container = styled('main')(
    ({ theme }) => `
    flex-grow: 1;
    background-color: ${theme.palette.primary.light};
`
);

const Content = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 25px;
    min-height: 100%;
`;

const SidebarButtons = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-end'
    }
}));

const FloatRight = styled(Stack)(({ theme }) => ({
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
        marginLeft: 15
    }
}));

type Props = {
    collapsed: boolean;
    handleToggleSidebar: (value: boolean) => void;
    handleCollapsedChange: (value: boolean) => void;
};

/**
 * The parent component that encompasses the body of any page on the site along side the sidebar
 */
export const Main = ({
    collapsed,
    handleToggleSidebar,
    handleCollapsedChange
}: Props): JSX.Element => (
    <Container>
        <PerfectScrollbar>
            <Content>
                <SidebarButtons>
                    <ToggleSidebarButton toggle={handleToggleSidebar} />
                    <CollapseSidebarButton collapsed={collapsed} onToggle={handleCollapsedChange} />
                    <FloatRight direction="row" spacing={2}>
                        <CartButton />
                        <LanguageSelect />
                    </FloatRight>
                </SidebarButtons>
                <Switch>
                    <Route path="/auth" component={AuthPage} />
                    <Route path="/not-found" component={NotFoundPage} />
                    <Route path="/something-went-wrong" component={SomethingWentWrongPage} />
                    <ProtectedRoute path="/marketplace" component={MarketplacePage} />
                    <ProtectedRoute path="/my-purchases/:userId" component={UserPurchasesPage} />
                    <ProtectedRoute path="/market-item/:itemId" component={MarketItemPage} />
                    <Redirect exact from="/" to="auth" />
                    <Redirect from="/" to="/not-found" />
                </Switch>
            </Content>
        </PerfectScrollbar>
    </Container>
);
