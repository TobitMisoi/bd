import { useCallback, useState } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggleOpen = useCallback(() => setState(state => true), []);
  const toggleClose = useCallback(() => setState(state => false), []);

  return [state, toggleOpen, toggleClose];
}

export default useToggle;