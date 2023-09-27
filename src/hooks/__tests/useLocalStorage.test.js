import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

describe('useLocalStorage', () => {
    afterEach(() => {
        localStorage.clear();
    });

    test('should return empty string', () => {
        const { result } = renderHook(() => useLocalStorage('key', 'get'));
        expect(result.current).toBe('');
    });

    test('should return value', () => {
        localStorage.setItem('key', JSON.stringify('storage value'));
        const { result } = renderHook(() => useLocalStorage('key', 'get'));
        expect(result.current).toBe('storage value');
    });

    test('should set value and get value', () => {
        const { result: setResult } = renderHook(() => useLocalStorage('key', 'set'));
        const [setValue] = setResult.current;
        setValue('Another storage value');

        const { result: getResult } = renderHook(() => useLocalStorage('key', 'get'));
        expect(getResult.current).toBe('Another storage value');
    });

    describe('delete', () => {
        let value;
        beforeEach(() => {
            const { result: setResult } = renderHook(() => useLocalStorage('key', 'set'));
            const [setValue] = setResult.current;
            setValue('Value for Delete');
            const { result: getResult } = renderHook(() => useLocalStorage('key', 'get'));
            value = getResult.current;
        })

        test('should delete value', () => {
            expect(value).toBe('Value for Delete');
      
            const { result: deleteResult } = renderHook(() => useLocalStorage('key', 'delete'));
            const [deleteValue] = deleteResult.current;
            deleteValue();
      
            const { result: getResult } = renderHook(() => useLocalStorage('key', 'get'));
            expect(getResult.current).toBe('');
          });
    });
});
