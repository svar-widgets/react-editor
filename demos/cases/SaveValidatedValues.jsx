import { useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor } from '/src';
import './SaveValidatedValues.css';

export default function SaveValidatedValues() {
  const { itemsValidation: items, valuesValidation } = useMemo(
    () => getData(),
    [],
  );
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState(valuesValidation);

  function handleClick({ item, changes }) {
    if (item.id === 'save' && changes.length) return;
    setVisible(false);
  }

  function handleSave(ev) {
    setValues(ev.values);
    setVisible(false);
  }

  return (
    <>
      <div
        className={`wx-Um0x7joh data ${visible ? 'active' : ''}`}
        onClick={() => setVisible(true)}
      >
        {Object.values(values).map((value, idx) => (
          <span key={idx}>{value}</span>
        ))}
      </div>

      {visible ? (
        <Editor
          placement={'sidebar'}
          autoSave={false}
          items={items}
          values={values}
          onAction={handleClick}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
}
