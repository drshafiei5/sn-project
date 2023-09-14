/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { store } from './redux/store';

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <Router>{children}</Router>
        </Provider>
    );
};

Providers.propTypes = {
    children: PropTypes.node.isRequired
};

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

const renderWithRouter = (ui) => {
    const history = createBrowserHistory();
    return {
        history,
        ...render(ui, { wrapper: Providers })
    };
};

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { customRender as render };
export { renderWithRouter };
