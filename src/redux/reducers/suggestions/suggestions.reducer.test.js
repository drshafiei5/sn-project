import { beforeEach, describe, expect, test } from "vitest";
import reducer, { setSuggestions } from "./suggestions.reducer";

const initialState = {
    users: [],
    status: 'idle'
};

describe('suggestions reducer', () => {
    beforeEach(() => {
        initialState.users = [];
        initialState.status = 'idle';
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            users: [],
            status: 'idle'
        });
    });

    test('should set users to suggestions', () => {
        const newState = { users: [1, 2, 3, 4, 5], status: 'fulfilled' };
        const updatedState = reducer(initialState, setSuggestions(newState));
        expect(updatedState, newState);
    });
});