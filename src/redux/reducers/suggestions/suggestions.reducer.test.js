import { beforeEach, describe, expect, test } from "vitest";
import reducer, { setSuggestions } from "./suggestions.reducer";

const initialState = {
    users: [],
    isLoading: false
};

describe('suggestions reducer', () => {
    beforeEach(() => {
        initialState.users = [];
        initialState.isLoading = false;
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            users: [],
            isLoading: false
        });
    });

    test('should set users to suggestions', () => {
        const newState = { users: [1, 2, 3, 4, 5], isLoading: true };
        const updatedState = reducer(initialState, setSuggestions(newState));
        expect(updatedState, newState);
    });
});