import { useEffect, useState } from 'react';

const useDetectMatchingBreakpoint = (value) => {
    const [isMatchingBreakpoint, setIsMatchingBreakpoint] = useState(
        window.matchMedia(`(max-width: ${value}px)`).matches,
    );

    useEffect(() => {
        window
            .matchMedia(`(max-width: ${value}px)`)
            .addEventListener('change', (e) => setIsMatchingBreakpoint(e.matches));
    }, []);

    return { isMatchingBreakpoint };
};

export default useDetectMatchingBreakpoint;
