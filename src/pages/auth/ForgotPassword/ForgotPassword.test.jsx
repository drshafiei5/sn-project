import { describe, expect, test } from 'vitest';

import ForgotPassword from './index';
import { server } from '../../../mocks/server';
import { forgotPasswordMockError } from '../../../mocks/handlers/auth';
import { fireEvent, render, screen, waitFor } from '../../../test.utils';

describe('Forget Password', () => {
    test('form should have email label', () => {
        render(<ForgotPassword />);
        const emailLabel = screen.getByLabelText('Email');
        expect(emailLabel).toBeInTheDocument();
    });

    test('should have "Back to Login" text', () => {
        render(<ForgotPassword />);
        const spanElement = screen.getByText('Back to Login');
        expect(spanElement).toBeInTheDocument();
    });

    describe('Button', () => {
        test('button should be disabled', () => {
            render(<ForgotPassword />);
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeDisabled();
        });

        test('should be enabled with input', () => {
            render(<ForgotPassword />);
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeDisabled();

            const emailElement = screen.getByLabelText('Email');
            fireEvent.change(emailElement, { target: { value: 'manny@test.com' } });
            expect(buttonElement).toBeEnabled();
        });

        test('should change label when clicked', async () => {
            render(<ForgotPassword />);
            const buttonElement = screen.getByRole('button');
            const emailElement = screen.getByLabelText('Email');

            fireEvent.change(emailElement, { target: { value: 'manny@test.com' } });
            fireEvent.click(buttonElement);

            const newButtonElement = screen.getByRole('button');
            expect(newButtonElement.textContent).toEqual('FORGOT PASSWORD IN PROGRESS...');

            await waitFor(() => {
                const newButtonElement1 = screen.getByRole('button');
                expect(newButtonElement1.textContent).toEqual('FORGOT PASSWORD');
            });
        });
    });

    describe('Success', () => {
        test('should display success alert', async () => {
            render(<ForgotPassword />);
            const buttonElement = screen.getByRole('button');
            const emailElement = screen.getByLabelText('Email');

            fireEvent.change(emailElement, { target: { value: 'exist@test.com' } });
            fireEvent.click(buttonElement);

            const alert = await screen.findByRole('alert');
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveClass('alert-success');
            expect(alert.textContent).toEqual('Password reset email sent.');
        });
    });

    describe('Error', () => {
        test('should display error alert and border', async () => {
            server.use(forgotPasswordMockError);
            render(<ForgotPassword />);
            const buttonElement = screen.getByRole('button');
            const emailElement = screen.getByLabelText('Email');

            fireEvent.change(emailElement, { target: { value: 'no-exist@test.com' } });
            fireEvent.click(buttonElement);

            const alert = await screen.findByRole('alert');
            expect(alert).toBeInTheDocument();
            await waitFor(() => expect(emailElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
            expect(alert).toHaveClass('alert-error');
            expect(alert.textContent).toEqual('Invalid credentials');
        });
    });
});
