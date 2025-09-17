import { useMemo } from 'react';
import { Editor } from '../../src';
import { getData } from '../data';
import './Validation.css';

function Validation() {
  const { items, values } = useMemo(() => {
    const { itemsValidation: items, valuesValidation: values } = getData();
    return { items, values };
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h3>Editor with validation and error messages</h3>
      <div className="wx-hxQnm3ZR bg">
        <Editor items={items} values={values} topBar={false} />
      </div>
    </div>
  );
}

export default Validation;
