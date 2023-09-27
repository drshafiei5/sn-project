import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as router from 'react-router';

import Login from './index';
import { server } from '../../../mocks/server';
import { signInMockError } from '../../../mocks/handlers/auth';
import { act, fireEvent, render, screen, waitFor } from '../../../test.utils';

describe('SignIn', () => {
    const navigate = vi.fn();
    beforeEach(() => {
        vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    });

    test('signin form should have its labels', () => {
        render(<Login />);

        const usernameLabel = screen.getByLabelText('Username');
        const passwordLabel = screen.getByLabelText('Password');

        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
    });

    test('checkbox should be unchecked', () => {
        render(<Login />);
        const checkBoxElement = screen.getByLabelText(/Keep me signed in/i);
        expect(checkBoxElement).not.toBeChecked();
    });

    describe('Button', () => {
        test('should be disabled', () => {
            render(<Login />);
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeDisabled();
        });

        test('should be enabled with inputs', () => {
            render(<Login />);
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeDisabled();

            const usernameElement = screen.getByLabelText('Username');
            const passwordElement = screen.getByLabelText('Password');

            fireEvent.change(usernameElement, { target: { value: 'manny' } });
            fireEvent.change(passwordElement, { target: { value: 'qwerty' } });

            expect(buttonElement).toBeEnabled();
        });

        test('should change label when clicked', async () => {
            render(<Login />);
            const buttonElement = screen.getByRole('button');
            const usernameElement = screen.getByLabelText('Username');
            const passwordElement = screen.getByLabelText('Password');

            fireEvent.change(usernameElement, { target: { value: 'manny' } });
            fireEvent.change(passwordElement, { target: { value: 'qwerty' } });

            act(() => {
                fireEvent.click(buttonElement);
            });

            await waitFor(() => {
                const newButtonElement = screen.getByRole('button');
                expect(newButtonElement.textContent).toEqual('SIGNIN IN PROGRESS...');
            });
        });
    });

    describe('Success', () => {
        test('should navigate to streams page', async () => {
            render(<Login />);
            const buttonElement = screen.getByRole('button');
            const usernameElement = screen.getByLabelText('Username');
            const passwordElement = screen.getByLabelText('Password');

            fireEvent.change(usernameElement, { target: { value: 'manny' } });
            fireEvent.change(passwordElement, { target: { value: 'qwerty' } });

            act(() => {
                fireEvent.click(buttonElement);
            });

            await waitFor(() => expect(navigate).toHaveBeenCalledWith('/app/social/streams'));
        });
    });

    describe('Error', () => {
        test('should display error alert and border', async () => {
            server.use(signInMockError);
            render(<Login />);
            const buttonElement = screen.getByRole('button');
            const usernameElement = screen.getByLabelText('Username');
            const passwordElement = screen.getByLabelText('Password');

            fireEvent.change(usernameElement, { target: { value: 'ma' } });
            fireEvent.change(passwordElement, { target: { value: 'qwerty' } });

            act(() => {
                fireEvent.click(buttonElement);
            });

            const alert = await screen.findByRole('alert');
            expect(alert).toBeInTheDocument();
            expect(alert.textContent).toEqual('Invalid credentials');

            await waitFor(() => expect(usernameElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
            await waitFor(() => expect(passwordElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
        });
    });
});
