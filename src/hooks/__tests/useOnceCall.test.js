import { describe, expect, test, vi } from "vitest"
import { renderHook } from "../../test.utils";
import useOnceCall from "../useOnceCall";

describe('useOnceCall', () => {
    test('should run provided effect only once', () => {
        const mockCallback = vi.fn();
        const { rerender } = renderHook(() => useOnceCall(mockCallback));
        expect(mockCallback).toHaveBeenCalledTimes(1);
        rerender();
        expect(mockCallback).toHaveBeenCalledTimes(1);
    })
})