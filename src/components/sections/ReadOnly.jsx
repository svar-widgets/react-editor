import { useMemo, useContext } from 'react';
import { Field } from '@svar-ui/react-core';
import { context } from '@svar-ui/react-core';
import { dateToString } from '@svar-ui/lib-dom';

function ReadOnly({ value, options, label, format }) {
  const i18n = useContext(context.i18n);
  const _ = i18n.getGroup('editor');
  const { calendar, formats } = i18n.getRaw();

  const text = useMemo(() => {
    let t = value;
    if (typeof value === 'boolean') {
      t = value ? _('Yes') : _('No');
    }

    if (value instanceof Date) {
      const f = format || formats?.dateFormat;
      t = dateToString(f, calendar)(value);
    }

    if (options) {
      t = (Array.isArray(value) ? value : [value])
        .map((id) => options.find((o) => o.id === id)?.label)
        .filter((o) => o !== undefined)
        .join(', ');
    }

    return t;
  }, [value, options, format, formats, calendar, _]);

  if (text || text === 0) {
    return <Field label={label}>{text}</Field>;
  }

  return null;
}

export default ReadOnly;
