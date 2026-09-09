import { useCallback, useEffect, useRef, useState } from 'react';
import FilesList from './FilesList.jsx';

export default function Files(props) {
  const { ondata, onChange, value, ...restProps } = props;

  // `ondata` may return a plain array or a promise; while a promise is pending
  // the list renders empty, mirroring the `{#await}` pending branch in Svelte
  const [data, setData] = useState(() => {
    const initial = ondata && value ? ondata(value) : value;
    return initial && typeof initial.then === 'function' ? [] : (initial ?? []);
  });

  // read `ondata` through a ref so an inline arrow in the item config cannot
  // retrigger the effect on every render
  const ondataRef = useRef(ondata);
  ondataRef.current = ondata;

  useEffect(() => {
    const resolver = ondataRef.current;
    const result = resolver && value ? resolver(value) : value;
    if (result && typeof result.then === 'function') {
      let cancelled = false;
      setData([]);
      result.then((resolved) => {
        if (!cancelled) setData(resolved ?? []);
      });
      return () => {
        cancelled = true;
      };
    }
    setData(result ?? []);
  }, [value]);

  const handleChange = useCallback(
    (ev) => {
      ev.originalValue = value;
      return onChange && onChange(ev);
    },
    [onChange, value],
  );

  return <FilesList data={data} {...restProps} onChange={handleChange} />;
}
