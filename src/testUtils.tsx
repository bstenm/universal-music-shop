import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import { createBrowserHistory } from 'history';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { render, RenderResult, fireEvent, screen, within } from '@testing-library/react';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { userReducer } from 'state/user/userSlice';

const customRender = (ui: ReactElement, { preloadedState = {}, ...options } = {}): RenderResult => {
    const history = createBrowserHistory();

    const rootReducer = combineReducers({
        router: connectRouter(history),
        user: userReducer
    });

    return render(ui, {
        wrapper: ({ children }) => (
            <Provider
                store={configureStore({
                    reducer: rootReducer,
                    preloadedState
                })}>
                <ConnectedRouter history={history}>{children}</ConnectedRouter>
            </Provider>
        ),
        ...options
    });
};

export * from '@testing-library/react';

export { customRender as render };

export const enterInputValue = (label: RegExp, value: string): boolean =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } });

export const selectFormOption = (label: RegExp, option: RegExp): void => {
    fireEvent.mouseDown(screen.getByLabelText(label));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(option));
};
