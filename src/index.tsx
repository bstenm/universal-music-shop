// TODO: Check how wdyr package works
import './wdyr';

import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode, Suspense } from 'react';
import { BrowserTracing } from '@sentry/tracing';
import { getAnalytics } from 'firebase/analytics';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { ConnectedRouter } from 'connected-react-router';

import { App } from 'components/App';
import { Fallback } from 'components/Fallback';
import { firebaseApp } from 'libs/firebaseApp';
import { store, history } from 'app/store';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';

import 'config/i18n';
import './index.css';

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
});

// Firebase analytics
getAnalytics(firebaseApp);

const theme: ThemeOptions = {
    palette: {
        primary: {
            dark: '#000',
            light: '#555',
            main: '#1f2022',
            contrastText: '#fff'
        },
        secondary: {
            light: '#876cc7',
            main: '#2AB3E2',
            contrastText: '#000'
        }
    }
};

ReactDOM.render(
    <StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Suspense fallback={<Fallback />}>
                    <App theme={theme} />
                </Suspense>
            </ConnectedRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
