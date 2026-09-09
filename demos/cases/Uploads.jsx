import { useCallback, useMemo, useState } from 'react';
import { Editor, registerEditorItem, Attachments } from '../../src';
import './Uploads.css';

registerEditorItem('files', Attachments);
registerEditorItem('files', Attachments, { readonly: true });

let counter = 100;
// fake server: returns the permanent id after a delay,
// fails for files with "fail" in the name
const uploadURL = (file) =>
  new Promise((res, rej) =>
    setTimeout(() => {
      if (/fail/i.test(file.name)) rej(new Error('server error'));
      else res({ id: counter++, name: file.name, url: '#' });
    }, 800),
  );

export default function Uploads() {
  const [message, setMessage] = useState('');

  const items = useMemo(
    () => [
      { comp: 'text', key: 'name', label: 'Name' },
      {
        comp: 'files',
        key: 'files',
        label: 'Attachments',
        uploadURL,
        onAction: (ev) => setMessage(`${ev.action}: ${ev.file.name}`),
      },
    ],
    [],
  );

  const [values, setValues] = useState({
    id: 1,
    name: 'Annual report',
    files: [
      { id: 1, name: 'report-2025.pdf', url: '#' },
      { id: 2, name: 'summary.xlsx', url: '#' },
    ],
  });

  const refresh = useCallback(({ values: v }) => {
    setValues((prev) => ({ ...prev, ...v }));
  }, []);

  return (
    <>
      <div className="wx-aabJ2sPO message">{message}</div>

      <p className="wx-aabJ2sPO hint">
        Files upload on select (mock server, ~1s); a file with &quot;fail&quot;
        in its name shows the error state. Add/delete signals appear above.
      </p>

      <Editor
        placement="sidebar"
        autoSave={true}
        items={items}
        values={values}
        onSave={refresh}
      />
    </>
  );
}
