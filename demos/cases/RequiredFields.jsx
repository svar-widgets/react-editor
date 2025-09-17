import { useState, useMemo, useContext } from 'react';
import { Editor } from '../../src';
import { context } from '@svar-ui/react-core';
import './RequiredFields.css';

export default function RequiredFields() {
  const helpers = useContext(context.helpers);

  const items = useMemo(
    () => [
      {
        comp: 'text',
        key: 'firstName',
        label: 'First name',
        required: true,
        validationMessage: 'Incorrect name!',
      },
      {
        comp: 'text',
        key: 'lastName',
        label: 'Last name',
        required: true,
      },
      {
        comp: 'text',
        key: 'company',
        label: 'Company name',
        required: true,
      },
      {
        comp: 'text',
        key: 'contact',
        label: 'Contact number',
        required: true,
      },
      {
        comp: 'text',
        key: 'email',
        label: 'Email',
        required: true,
      },
      {
        comp: 'textarea',
        key: 'additional',
        label: 'Additional information',
      },
    ],
    [],
  );

  const getValues = () => {
    const out = {};
    items.forEach((item) => (out[item.key] = ''));
    return out;
  };

  const [values, setValues] = useState(getValues);

  function handleSave() {
    helpers.showNotice({ text: `Values was successfully saved` });
    setTimeout(() => {
      setValues({});
    }, 0);
  }

  return (
    <div style={{ padding: '10px' }}>
      <h3>Editor with required fields</h3>
      <div className="wx-J5kUNlmQ bg">
        <Editor
          items={items}
          values={values}
          bottomBar={{
            items: [
              { comp: 'spacer' },
              {
                comp: 'button',
                type: 'primary',
                text: 'Save',
                id: 'save',
              },
            ],
          }}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
