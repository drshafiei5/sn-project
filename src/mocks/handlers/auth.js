import { rest } from 'msw';
import { BASE_ENDPOINT } from '../../services/axios';
import { existingUser, userJwt } from '../data/user.mock';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
    const result = { message: 'User created successfully', user: existingUser, token: userJwt };
    return res(ctx.json(result));
});

export const signupMockError = rest.post(`${BASE_URL}/signup`, (req, res, ctx) => {
    const result = { message: 'Invalid credentials' };
    return res(ctx.status(400), ctx.json(result));
});

export const signInMock = rest.post(`${BASE_URL}/signin`, (req, res, ctx) => {
    const result = { message: 'User login successfully', user: existingUser, token: userJwt };
    return res(ctx.json(result));
});

export const signInMockError = rest.post(`${BASE_URL}/signin`, (req, res, ctx) => {
    const result = { message: 'Invalid credentials' };
    return res(ctx.status(400), ctx.json(result));
});

export const forgotPasswordMock = rest.post(`${BASE_URL}/forgot-password`, (req, res, ctx) => {
    const result = { message: 'Password reset email sent.' };
    return res(ctx.json(result));
});

export const forgotPasswordMockError = rest.post(`${BASE_URL}/forgot-password`, (req, res, ctx) => {
    const result = { message: 'Invalid credentials' };
    return res(ctx.status(400), ctx.json(result));
});

export const resetPasswordMock = rest.post(`${BASE_URL}/reset-password/1234567890`, (req, res, ctx) => {
    const result = { message: 'Password successfully updated.' };
    return res(ctx.json(result));
});

export const resetPasswordMockError = rest.post(`${BASE_URL}/reset-password/1234567890`, (req, res, ctx) => {
    const result = { message: 'Passwords do not match' };
    return res(ctx.status(400), ctx.json(result));
});

export const authHandlers = [
    signUpMock,
    signupMockError,
    signInMock,
    signInMockError,
    forgotPasswordMock,
    forgotPasswordMockError,
    resetPasswordMock,
    resetPasswordMockError
];
