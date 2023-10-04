import { beforeEach, describe, expect, test } from "vitest";
import userReducer, { clearUser, setUser, updateUserProfile } from "./user.reducer";

const initialState = {
    token: '',
    profile: null
};

describe('user reducer', () => {
    beforeEach(() => {
        initialState.token = '';
        initialState.profile = null;
    });

    test('should return the initial state', () => {
        expect(userReducer(undefined, {}))
            .toEqual({ token: '', profile: null });
    });

    test('should add user with token and profile', () => {
        const userData = { token: '1234', profile: { username: 'manny' } };
        expect(userReducer(initialState, setUser(userData)))
            .toEqual(userData);
    });

    test('should update user profile', () => {
        initialState.token = '1234';
        initialState.profile = { username: 'manny' };

        expect(userReducer(initialState, updateUserProfile({ username: 'Sunny' })))
            .toEqual({ token: '1234', profile: { username: 'Sunny' } });
    });

    test('should reset profile and token', () => {
        initialState.token = '1234';
        initialState.profile = { username: 'manny' };

        expect(userReducer(initialState, clearUser()))
            .toEqual({ token: '', profile: null });
    });
});