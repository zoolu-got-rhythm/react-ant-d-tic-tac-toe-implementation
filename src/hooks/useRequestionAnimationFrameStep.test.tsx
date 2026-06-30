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

        expect(requestAnimationFrameCallbacks).toHaveLength(1);

        act(() => {
            requestAnimationFrameCallbacks[0](100);
        });

        expect(workFunctionCallback).toHaveBeenCalledTimes(1);
        expect(requestAnimationFrameCallbacks).toHaveLength(1);
    });
});
