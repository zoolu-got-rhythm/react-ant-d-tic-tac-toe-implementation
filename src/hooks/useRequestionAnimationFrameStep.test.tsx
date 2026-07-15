import { act, renderHook } from "@testing-library/react";
import { useRequestAnimationFrameStep } from "./useRequestionAnimationFrameStep";

describe("useRequestAnimationFrameStep", () => {
    let requestAnimationFrameCallbacks: Array<(time: number) => void> = [];
    let nextAnimationFrameId = 1;

    beforeEach(() => {
        requestAnimationFrameCallbacks = [];
        nextAnimationFrameId = 1;

        jest.spyOn(window, "requestAnimationFrame").mockImplementation(
            (callback: FrameRequestCallback) => {
                requestAnimationFrameCallbacks.push(callback);
                return nextAnimationFrameId++;
            },
        );

        jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {
            return undefined;
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("stops scheduling new frames after cancellation inside the callback", () => {
        const { result } = renderHook(() => useRequestAnimationFrameStep());

        const workFunctionCallback = jest.fn(() => {
            result.current[1]();
        });

        act(() => {
            result.current[0](workFunctionCallback, 100);
        });

        expect(requestAnimationFrameCallbacks).toHaveLength(0);
        expect(workFunctionCallback).toHaveBeenCalledTimes(1);

    });

    it("calls the work function on each simulated interval tick", () => {
        const { result } = renderHook(() => useRequestAnimationFrameStep());

        const workFunctionCallback = jest.fn();

        act(() => {
            result.current[0](workFunctionCallback, 100);
        });

        // initial call fires synchronously
        expect(workFunctionCallback).toHaveBeenCalledTimes(1);

        // first scheduled frame only seeds the start timestamp
        act(() => {
            requestAnimationFrameCallbacks[0](0);
        });
        expect(workFunctionCallback).toHaveBeenCalledTimes(1);

        // simulated 100ms later - interval elapsed, callback fires again
        act(() => {
            requestAnimationFrameCallbacks[1](100);
        });
        expect(workFunctionCallback).toHaveBeenCalledTimes(2);

        // another simulated 100ms later - fires a third time
        act(() => {
            requestAnimationFrameCallbacks[2](200);
        });
        expect(workFunctionCallback).toHaveBeenCalledTimes(3);
    });
});
