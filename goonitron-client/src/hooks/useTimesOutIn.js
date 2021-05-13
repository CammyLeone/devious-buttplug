import { useRef, useState, useEffect } from "react";

export default function useTimesOutIn(millis) {
  const [mostRecent, setMostRecent] = useState(null);
  const [isExpired, setExpired] = useState(false);
  const timeout = useRef(null);
  useEffect(() => {
    if (isExpired) return;

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setExpired(true), millis);
  }, [mostRecent, isExpired, millis]);

  const resetExpired = () => {
    setExpired(false);
    setMostRecent(Date.now());
  };
  return [isExpired, resetExpired];
}
