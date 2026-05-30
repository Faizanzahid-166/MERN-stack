// src/hooks/useDebounce.js
// Delays updating a value until the user has stopped typing.
// Usage: const debouncedSearch = useDebounce(searchTerm, 400);
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
