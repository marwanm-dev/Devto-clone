import { useState, useEffect } from 'react';

const getLocalValue = (key, initialValue) => {
  // If using SSR Next.js
  if (typeof window === 'undefined') return initialValue;

  // If a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // If a value is a result of a function
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
