import { useState, useEffect } from "react";

export function useMinWidth(minWidth: number): boolean {
    const [isMinWidth, setIsMinWidth] = useState(false);

    useEffect(() => {
        function checkWidth() {
            setIsMinWidth(window.innerWidth >= minWidth);
        }

        checkWidth();

        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, [minWidth]);

    return isMinWidth;
}
