import { useMemo, useContext } from 'react';
import { Field } from '@svar-ui/react-core';
import { context } from '@svar-ui/react-core';

function ReadOnly({ value, options, label }) {
  const i18n = useContext(context.i18n);
  const _ = i18n.getGroup('editor');

  const text = useMemo(() => {
    let t = value;
    if (typeof value === 'boolean') {
      t = value ? _('Yes') : _('No');
    }

    if (options) {
      const option = options.find((o) => o.id === value);
      if (option) {
        t = option.label;
      }
    }

    return t;
  }, [value, options, _]);

  if (text || text === 0) {
    return <Field label={label}>{text}</Field>;
  }

  return null;
}

export default ReadOnly;
