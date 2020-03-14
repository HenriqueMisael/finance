import { useEffect } from 'react';

/**
 * @param {string | number} value
 * @param {function(string | number):void} setValue
 * @param {string | number} initialValue
 * @param {function(string | number):void} onSubmitChange
 * @param {?number} delay
 */
function useDebounce(value, setValue, initialValue, onSubmitChange, delay = 250) {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value === initialValue) return;
      onSubmitChange(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [initialValue, value, delay, onSubmitChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, setValue]);
}

export default useDebounce;
