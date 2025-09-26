import { Locale } from '@svar-ui/react-core';
import en from '../en.js';

import Editor from './FormEditor.jsx';
import Values from './Values.jsx';
import './Form.css';

function Form({
  values = {},
  items = [],
  css = '',
  activeBatch = null,
  focus = false,
  autoSave = true,
  readonly = false,
  children,
  ...restProps
}) {
  const processedRestProps = {};
  for (const key in restProps) {
    if (/^on[a-z]/.test(key)) {
      const newKey = 'on' + key.charAt(2).toUpperCase() + key.slice(3);
      // If a camelCase version already exists on restProps, prefer that and skip the lower-case variant
      if (newKey in restProps) {
        continue;
      }
      processedRestProps[newKey] = restProps[key];
      continue;
    }
    processedRestProps[key] = restProps[key];
  }

  return (
    <Locale words={en} optional={true}>
      <div className="wx-H902AF2Y wx-content">
        <Values
          view={Editor}
          values={values}
          items={items}
          css={css}
          focus={focus}
          activeBatch={activeBatch}
          autoSave={autoSave}
          readonly={readonly}
          {...processedRestProps}
        >
          {children}
        </Values>
      </div>
    </Locale>
  );
}

export default Form;
