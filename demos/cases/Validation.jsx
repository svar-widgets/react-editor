import { useEffect, useMemo } from 'react';
import { Editor } from '../../src';
import { getData } from '../data';

function Validation() {
  const { items, values } = useMemo(() => {
    const { itemsValidation: items, valuesValidation: values } = getData();
    return { items, values };
  }, []);

  useEffect(() => {
    // trigger validation
    const timer = setTimeout(() => {
      const input = document.querySelector('.wx-editor .wx-text input');
      if (!input) return;

      // bypass React's value tracker, otherwise the synthetic input
      // event is swallowed as a no-op change
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      ).set;
      setter.call(input, '');
      input.dispatchEvent(
        new InputEvent('input', {
          inputType: 'deleteContentBackward',
          bubbles: true,
        }),
      );
      input.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Editor items={items} values={values} topBar={false} />
    </div>
  );
}

export default Validation;
