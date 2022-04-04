import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';

import { Layout } from 'components/Layout';
import { useAlert } from 'hooks/useAlert';
import { RootState } from 'app/store';
import { AlertProps } from 'state/alert/alertSlice';
import { defaultLang } from 'config';
import { LangContext } from 'libs/contexts';
import { AlertSnackbar } from 'components/AlertSnackbar';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';

type Props = {
    theme: ThemeOptions;
};

export const App = ({ theme }: Props): JSX.Element => {
    const { i18n } = useTranslation();

    const lang = i18n.language ?? defaultLang;

    const { closeAlert } = useAlert();

    const alert: AlertProps = useAppSelector((state: RootState) => state.alert);

    // TODO: get locale from i18next
    const themeWithLocale = createTheme(theme, locales.enUS);

    return (
        <LangContext.Provider value={[lang, i18n.changeLanguage]}>
            <ThemeProvider theme={themeWithLocale}>
                <Layout />
                <AlertSnackbar type={alert.type} onClose={closeAlert} message={alert.message} />
            </ThemeProvider>
        </LangContext.Provider>
    );
};
