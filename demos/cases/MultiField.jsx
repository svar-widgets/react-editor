import { useCallback, useMemo, useState } from 'react';
import { Editor, registerEditorItem } from '../../src';
import EventDates from '../custom/EventDates.jsx';
import './MultiField.css';

registerEditorItem('event-dates', EventDates);

export default function MultiField() {
  const items = useMemo(
    () => [
      { comp: 'text', key: 'name', label: 'Name' },
      {
        comp: 'event-dates',
        key: 'dates',
        keys: ['start', 'end', 'isFullDay'],
        label: 'Event dates',
        validation: (v) => !v.start || !v.end || v.end >= v.start,
        validationMessage: 'End date must be after the start date',
      },
      { comp: 'textarea', key: 'descr', label: 'Description' },
    ],
    [],
  );

  const [values, setValues] = useState({
    name: 'Project kickoff',
    start: new Date(2026, 5, 10, 9),
    end: new Date(2026, 5, 10, 11),
    isFullDay: false,
    descr: 'Initial planning meeting',
  });

  const [message, setMessage] = useState('');

  const handleSave = useCallback(({ changes, values: next }) => {
    setMessage(`saved fields: ${changes.join(', ')}`);
    setValues((prev) => ({ ...prev, ...next }));
  }, []);

  return (
    <div style={{ padding: '10px', maxWidth: '700px' }}>
      <Editor
        items={items}
        values={values}
        topBar={false}
        autoSave={true}
        onSave={handleSave}
      />
      {message ? <div className="wx-aaafIDl3 status">{message}</div> : null}
    </div>
  );
}
