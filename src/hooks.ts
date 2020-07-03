import React, { useState } from "react";

const useStateWithLocalStorage = <T>(
  key: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const initialValue = localStorage.getItem(key) || "";
  let initial: T | undefined;
  try {
    initial = JSON.parse(initialValue) as T;
  } catch {
    initial = undefined;
  }
  const [value, setValue] = useState<T | undefined>(initial);

  React.useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [key, value]);

  return [value, setValue];
};

export { useStateWithLocalStorage };
