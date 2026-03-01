import { useEffect } from "react";

export function useHasMounted(componentName: string) {
    useEffect(() => {
        console.log(`${componentName} has mounted`);
        return () => {
            console.log(`${componentName} has unmounted`);
        };
    });
}
