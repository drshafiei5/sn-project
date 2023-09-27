import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as router from 'react-router';
import { act } from 'react-dom/test-utils';
import Register from './index';
import { fireEvent, render, screen, waitFor } from '../../../test.utils';
import { Utils } from '../../../services/utils/utils.service';
import { server } from '../../../mocks/server';
import { signupMockError } from '../../../mocks/handlers/auth';

describe('Register', () => {
    const navigate = vi.fn();
    beforeEach(() => {
        vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    });

    test('signup form should have its labels', () => {
        render(<Register />);

        const usernameLabel = screen.getByLabelText('Username');
        const emailLabel = screen.getByLabelText('Email');
        const passwordLabel = screen.getByLabelText('Password');

        expect(usernameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
    });

    describe('Button', () => {
        test('should be disabled', () => {
            render(<Register />);
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeDisabled();
        });

        test('should be enabled with input values', () => {
            render(<Register />);
            const buttonElement = screen.getByRole('button');
            const usernameLabel = screen.getByLabelText('Username');
            const emailLabel = screen.getByLabelText('Email');
            const passwordLabel = screen.getByLabelText('Password');

            fireEvent.change(usernameLabel, { target: { value: 'manny' } });
            fireEvent.change(emailLabel, { target: { value: 'manny@test.com' } });
            fireEvent.change(passwordLabel, { target: { value: 'qwerty' } });

            expect(buttonElement).toBeEnabled();
        });

        test('should change label when clicked', async () => {
            vi.spyOn(Utils, 'generateAvatar').mockReturnValue('avatar image');
            

            render(<Register />);
            const buttonElement = screen.getByRole('button');
            const usernameLabel = screen.getByLabelText('Username');
            const emailLabel = screen.getByLabelText('Email');
            const passwordLabel = screen.getByLabelText('Password');

            fireEvent.change(usernameLabel, { target: { value: 'manny' } });
            fireEvent.change(emailLabel, { target: { value: 'manny@test.com' } });
            fireEvent.change(passwordLabel, { target: { value: 'qwerty' } });

            act(() => {
                fireEvent.click(buttonElement);
            });

            await waitFor(() => {
                const newButtonElement = screen.getByRole('button');
                expect(newButtonElement.textContent).toEqual('SIGNUP IN PROGRESS...');
            });
        });

        describe('Success', () => {
            test('should navigate to streams page', async () => {
                vi.spyOn(Utils, 'generateAvatar').mockReturnValue('avatar image');
                
                render(<Register />);
                const buttonElement = screen.getByRole('button');
                const usernameElement = screen.getByLabelText('Username');
                const emailElement = screen.getByLabelText('Email');
                const passwordElement = screen.getByLabelText('Password');

                fireEvent.change(usernameElement, { target: { value: 'manny' } });
                fireEvent.change(emailElement, { target: { value: 'manny@test.com' } });
                fireEvent.change(passwordElement, { target: { value: 'qwerty' } });

                act(() => {
                    fireEvent.click(buttonElement);
                });

                await waitFor(() => expect(navigate).toHaveBeenCalledWith('/app/social/streams'));
            });
        });

        describe('Error', () => {
            test('should display error alert and border', async () => {
                server.use(signupMockError);
                vi.spyOn(Utils, 'generateAvatar').mockReturnValue('avatar image');
                
                render(<Register />);
                const buttonElement = screen.getByRole('button');
                const usernameElement = screen.getByLabelText('Username');
                const emailElement = screen.getByLabelText('Email');
                const passwordElement = screen.getByLabelText('Password');

                fireEvent.change(usernameElement, { target: { value: 'manny' } });
                fireEvent.change(emailElement, { target: { value: 'manny@test.com' } });
                fireEvent.change(passwordElement, { target: { value: 'qwerty' } });
                fireEvent.click(buttonElement);

                const alert = await screen.findByRole('alert');
                expect(alert).toBeInTheDocument();
                expect(alert.textContent).toEqual('Invalid credentials');

                await waitFor(() => expect(usernameElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
                await waitFor(() => expect(emailElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
                await waitFor(() => expect(passwordElement).toHaveStyle({ border: '1px solid #fa9b8a' }));
            });
        });
    });
});
