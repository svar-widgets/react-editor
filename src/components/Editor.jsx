import { Locale } from '@svar-ui/react-core';
import en from '../en.js';

import Layout from './Layout.jsx';
import Values from './Values.jsx';

export default function Editor(props) {
  const {
    values = {},
    items = [],
    css = '',
    activeBatch = null,
    topBar = true,
    bottomBar = true,
    focus = false,
    autoSave = false,
    autoApply = false,
    layout = 'default',
    readonly = false,
    placement = 'inline',
    children,
    ...restProps
  } = props;

  const normalizedRestProps = Object.keys(restProps).reduce((acc, key) => {
    if (/^on[a-z]/.test(key)) {
      const newKey = 'on' + key.charAt(2).toUpperCase() + key.slice(3);
      if (newKey in restProps) {
        // Prefer existing camelCase prop if present; keep original key as-is to avoid overwriting
        acc[key] = restProps[key];
      } else {
        acc[newKey] = restProps[key];
      }
    } else {
      acc[key] = restProps[key];
    }
    return acc;
  }, {});

  return (
    <Locale words={en} optional={true}>
      <Values
        view={Layout}
        values={values}
        items={items}
        css={css}
        activeBatch={activeBatch}
        topBar={topBar}
        bottomBar={bottomBar}
        focus={focus}
        autoSave={autoSave}
        autoApply={autoApply}
        layout={layout}
        readonly={readonly}
        placement={placement}
        {...normalizedRestProps}
      >
        {children}
      </Values>
    </Locale>
  );
}
