import { useState, useEffect } from "react";

export default function useSelfDismissing(timeout) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (shown) setTimeout(() => setShown(false), timeout);
  }, [shown, timeout]);

  return [shown, setShown.bind(true)];
}
