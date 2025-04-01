import { useEffect } from "react";
import type { RefObject } from "react";

type Handler = () => void;

const useOnClickOutside = (ref: RefObject<HTMLDivElement>, handler: Handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
