import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

const isDev: boolean = process.env.NODE_ENV !== 'production';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: rootReducer(history),
    middleware: (getDefaultMiddleware) =>
        isDev
            ? getDefaultMiddleware().concat(routerMiddleware(history), logger)
            : getDefaultMiddleware().concat(routerMiddleware(history))
});

if (isDev && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
