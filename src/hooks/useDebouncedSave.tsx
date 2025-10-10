import { useCallback, useEffect, useRef } from "react";

interface UseDebouncedSaveOptions {
  delay: number;
  maxWait?: number;
}

function useDebouncedSave<T extends (...args: any[]) => void>(
  updateNoteOnServer: T,
  { delay, maxWait }: UseDebouncedSaveOptions
) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCallTimeRef = useRef<number>(0);

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

      if (maxWait && !lastCallTimeRef.current) {
        lastCallTimeRef.current = now;

        maxWaitTimeoutRef.current = setTimeout(() => {
          updateNoteOnServer(...saveParams);
          lastCallTimeRef.current = 0;
        }, maxWait);
      }

      timeoutRef.current = setTimeout(() => {
        updateNoteOnServer(...saveParams);
        lastCallTimeRef.current = 0;

        if (maxWaitTimeoutRef.current) {
          clearTimeout(maxWaitTimeoutRef.current);
        }
      }, delay);
    },
    [updateNoteOnServer, delay, maxWait, cancelTimer]
  );

  useEffect(() => {
    return () => cancelTimer();
  }, [cancelTimer]);

  return debouncedSave;
}

export default useDebouncedSave;
