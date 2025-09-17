import { useState, useMemo } from 'react';

export function useLink(getValue) {
  const [localState, setLocalState] = useState(undefined);
  const linkedDerived = useMemo(() => {
    const linkedValue = getValue();
    return typeof localState !== 'undefined' ? localState : linkedValue;
  }, [getValue, localState]);

  return [
    () => linkedDerived,
    (v) => {
      setLocalState(v);
    },
  ];
}

export function useDataLink(getValue) {
  const [getErrors, setErrors] = useLink(getValue);

  return {
    get errors() {
      return getErrors();
    },
    set errors(value) {
      setErrors(value);
    },
  };
}
