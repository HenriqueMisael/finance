import { useEffect, useRef } from "react";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  /** If true, shortcut fires even when focus is in an input/textarea */
  global?: boolean;
  action: () => void;
}

export function useShortcuts(shortcuts: Shortcut[]) {
  const ref = useRef(shortcuts);
  ref.current = shortcuts;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      for (const s of ref.current) {
        if (isInput && !s.global) continue;

        const ctrlMatch = s.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const altMatch = s.alt ? e.altKey : !e.altKey;
        const shiftMatch = s.shift ? e.shiftKey : !e.shiftKey;

        if (e.key.toLowerCase() === s.key.toLowerCase() && ctrlMatch && altMatch && shiftMatch) {
          e.preventDefault();
          s.action();
          return;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
