import { createSearchParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '../../../test.utils';
import ResetPassword from '.';
import { server } from '../../../mocks/server';
import { resetPasswordMockError } from '../../../mocks/handlers/auth';

describe('ResetPassword', () => {
    beforeEach(() => {
        const url = `/reset-password?${createSearchParams({
            token: '1234567890'
        })}`;
        const history = createBrowserHistory();
        history.push(url);
    });

    test('should have password inputs', () => {
        render(<ResetPassword />);
        const newPasswordLabel = screen.getByLabelText('New Password');
        const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
        expect(newPasswordLabel).toBeInTheDocument();
        expect(confirmPasswordLabel).toBeInTheDocument();
    });

    test('button should be disabled', () => {
        render(<ResetPassword />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });

    test('should have "Back to Login" text', () => {
        render(<ResetPassword />);
        const spanElement = screen.getByText('Back to Login');
        expect(spanElement).toBeInTheDocument();
    });

    test('should be enabled with input', () => {
        render(<ResetPassword />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();

        const newPasswordLabel = screen.getByLabelText('New Password');
        const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
        fireEvent.change(newPasswordLabel, { target: { value: 'qwerty1' } });
        fireEvent.change(confirmPasswordLabel, { target: { value: 'qwerty1' } });
        expect(buttonElement).toBeEnabled();
    });

    test('should change label when clicked', async () => {
        render(<ResetPassword />);
        const buttonElement = screen.getByRole('button');
        const newPasswordLabel = screen.getByLabelText('New Password');
        const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

        fireEvent.change(newPasswordLabel, { target: { value: 'qwerty1' } });
        fireEvent.change(confirmPasswordLabel, { target: { value: 'qwerty1' } });
        fireEvent.click(buttonElement);

        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('RESET PASSWORD IN PROGRESS...');

        await waitFor(() => {
            const newButtonElement1 = screen.getByRole('button');
            expect(newButtonElement1.textContent).toEqual('RESET PASSWORD');
        });
    });

    describe('Success', () => {
        test('should display success alert', async () => {
            render(<ResetPassword />);
            const buttonElement = screen.getByRole('button');
            const newPasswordLabel = screen.getByLabelText('New Password');
            const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

            fireEvent.change(newPasswordLabel, { target: { value: 'qwerty1' } });
            fireEvent.change(confirmPasswordLabel, { target: { value: 'qwerty1' } });
            fireEvent.click(buttonElement);

            const alert = await screen.findByRole('alert');
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveClass('alert-success');
            expect(alert.textContent).toEqual('Password successfully updated.');
        });
    });

    describe('Error', () => {
        test('should display error alert and border', async () => {
            server.use(resetPasswordMockError);
            render(<ResetPassword />);
            const buttonElement = screen.getByRole('button');
            const newPasswordLabel = screen.getByLabelText('New Password');
            const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

            fireEvent.change(newPasswordLabel, { target: { value: 'qwerty1' } });
            fireEvent.change(confirmPasswordLabel, { target: { value: 'qwerty1' } });
            fireEvent.click(buttonElement);

            const alert = await screen.findByRole('alert');
            expect(alert).toBeInTheDocument();

            await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '1px solid #fa9b8a' }));
            await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '1px solid #fa9b8a' }));
            
            expect(alert).toHaveClass('alert-error');
            expect(alert.textContent).toEqual('Passwords do not match');
        });
    });
});
