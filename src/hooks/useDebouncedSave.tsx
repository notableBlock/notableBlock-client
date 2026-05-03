import { useCallback, useEffect, useRef } from "react";

interface UseDebouncedSaveOptions {
  delay: number;
  maxWait?: number;
}

const useDebouncedSave = <T extends (...saveParams: any[]) => void>(
  updateNoteOnServer: T,
  { delay, maxWait }: UseDebouncedSaveOptions,
): [(...saveParams: Parameters<T>) => void, () => void] => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCallTimeRef = useRef<number>(0);
  const pendingParamsRef = useRef<Parameters<T> | null>(null);

  const cancelTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
    }
  }, []);

  const debouncedSave = useCallback(
    (...saveParams: Parameters<T>) => {
      const now = Date.now();

      cancelTimer();
      pendingParamsRef.current = saveParams;

      if (maxWait && !lastCallTimeRef.current) {
        lastCallTimeRef.current = now;

        maxWaitTimeoutRef.current = setTimeout(() => {
          updateNoteOnServer(...saveParams);
          lastCallTimeRef.current = 0;
          pendingParamsRef.current = null;
        }, maxWait);
      }

      timeoutRef.current = setTimeout(() => {
        updateNoteOnServer(...saveParams);
        lastCallTimeRef.current = 0;
        pendingParamsRef.current = null;

        if (maxWaitTimeoutRef.current) {
          clearTimeout(maxWaitTimeoutRef.current);
        }
      }, delay);
    },
    [updateNoteOnServer, delay, maxWait, cancelTimer],
  );

  const flush = useCallback(() => {
    if (!pendingParamsRef.current) return;

    cancelTimer();
    updateNoteOnServer(...pendingParamsRef.current);
    pendingParamsRef.current = null;
    lastCallTimeRef.current = 0;
  }, [updateNoteOnServer, cancelTimer]);

  useEffect(() => {
    return () => cancelTimer();
  }, [cancelTimer]);

  return [debouncedSave, flush];
};

export default useDebouncedSave;
