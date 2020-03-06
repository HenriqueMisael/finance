import { useEffect } from 'react';

/**
 * @param {Object} timeoutID
 * @param {string | number} value
 * @param {string | number} initialValue
 * @param {function(string | number):void} onSubmitChange
 * @param {?number} delay
 */
function useDebounce(timeoutID, value, initialValue, onSubmitChange, delay = 1000) {

  useEffect(() => {
    if (timeoutID) clearTimeout(timeoutID);
    if (value === initialValue) return;
    timeoutID = setTimeout(() => onSubmitChange(value), delay);
  }, [value, initialValue, onSubmitChange]);

  return timeoutID;
}

export default useDebounce;
