import { useSyncExternalStore } from 'react';

const subscribe = (query: string) => (onChange: () => void) => {
  const list = window.matchMedia(query);
  list.addEventListener('change', onChange);
  return () => list.removeEventListener('change', onChange);
};

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True for a mouse or trackpad — gates hover-driven effects. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)', true);
