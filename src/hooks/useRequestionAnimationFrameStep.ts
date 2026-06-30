import { useEffect, useRef } from "react";

export function useRequestAnimationFrameStep(): [
    (
        workFunctionCallback: () => void,
        stepIntervalInMilliseconds: number,
    ) => void,
    () => void,
] {
    const animIdRef = useRef<number | null>(null);
    const isCancelledRef = useRef(false);

    // unmount clean-up behaviour
    useEffect(() => {
        return () => {
            cancelRequestAnimiationFrameStep();
        };
    }, []);

    function requestAnimiationFrameStep(
        workFunctionCallback: () => void,
        stepIntervalInMilliseconds: number,
    ) {
        isCancelledRef.current = false;
        let start: number | null = null;

        const step = (timeStampNow: number) => {
            if (isCancelledRef.current) {
                return;
            }

            if (start === null) {
                start = timeStampNow;
            }

            const timeElapsedInMilliseconds = timeStampNow - start;

            if (timeElapsedInMilliseconds >= stepIntervalInMilliseconds) {
                start = timeStampNow;
                workFunctionCallback();
            }

            if (!isCancelledRef.current) {
                animIdRef.current = window.requestAnimationFrame(step);
            }
        };

        if (animIdRef.current !== null) {
            window.cancelAnimationFrame(animIdRef.current);
        }

        animIdRef.current = window.requestAnimationFrame(step);
    }

    function cancelRequestAnimiationFrameStep() {
        isCancelledRef.current = true;
        if (animIdRef.current !== null) {
            window.cancelAnimationFrame(animIdRef.current);
            animIdRef.current = null;
        }
    }

    return [requestAnimiationFrameStep, cancelRequestAnimiationFrameStep];
}
