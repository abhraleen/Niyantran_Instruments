import { useMemo } from 'react';

/**
 * Detects whether the device is low-end based on:
 * - user preference (prefers-reduced-motion)
 * - CPU core count  (≤ 4 cores)
 * - Device memory   (< 4 GB, when available)
 *
 * Returns `isLowEnd: true` on any of the above conditions so that
 * heavy canvas/WebGL/particle effects can be gracefully degraded.
 */
export function usePerformance(): { isLowEnd: boolean } {
    return useMemo(() => {
        if (typeof window === 'undefined') return { isLowEnd: false };

        const prefersReducedMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const cores = navigator.hardwareConcurrency ?? 8;
        const memory =
            (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

        const isLowEnd = prefersReducedMotion || cores <= 4 || memory < 4;
        return { isLowEnd };
    }, []);
}
