import { useEffect } from 'react';

/**
 * @param {string | number} value
 * @param {string | number} initialValue
 * @param {function(string | number):void} onSubmitChange
 * @param {?number} delay
 */
function useDebounce(value, initialValue, onSubmitChange, delay = 500) {
  useEffect(() => {
    const handler = setTimeout(() => {
      onSubmitChange(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onSubmitChange]);
}

export default useDebounce;
