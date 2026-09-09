import { useCallback, useMemo, useRef, useState } from 'react';
import { Editor, registerEditorItem, TinyMCE } from '../../src';
import './TinyMCE.css';

registerEditorItem('tinymce', TinyMCE);

const initialRecords = [
  {
    id: 1,
    name: 'welcome.html',
    content: `<h2>Welcome aboard!</h2>
<p>We are <strong>thrilled</strong> to have you join the team. Over the next few days you will meet your colleagues, set up your tools, and get a feel for how we work.</p>
<p>Take your time to settle in - and remember, <em>there are no silly questions</em>. Reach out whenever you need a hand.</p>
<p>Warm regards,<br /><strong>The People Team</strong></p>`,
  },
  {
    id: 2,
    name: 'newsletter.html',
    content: `<h2>Monthly Update</h2>
<p>Here is a quick look at what shipped this month and what is coming next.</p>
<ul>
    <li><strong>New dashboard:</strong> a faster, cleaner overview of your projects.</li>
    <li><strong>Dark mode:</strong> now available in <em>Settings &rarr; Appearance</em>.</li>
    <li><strong>Bug fixes:</strong> dozens of small improvements across the app.</li>
</ul>
<p>As always, we would <em>love</em> to hear your feedback. Just hit reply and let us know what you think.</p>`,
  },
  {
    id: 3,
    name: 'about.html',
    content: `<h2>About Us</h2>
<p>We build <strong>simple, reliable tools</strong> that help teams do their best work. Founded in a tiny garage, we now serve customers in <em>over forty countries</em>.</p>
<p>Our philosophy is straightforward: listen carefully, ship often, and always put the <strong>user first</strong>.</p>
<p><em>Thanks for being part of the journey.</em></p>`,
  },
];

export default function TinyMCEDemo() {
  // records are mutated in place so switching files preserves edits
  const records = useRef(initialRecords.map((r) => ({ ...r }))).current;

  const [selectedId, setSelectedId] = useState(records[0].id);
  const selected = records.find((r) => r.id === selectedId);

  const [values, setValues] = useState({ ...records[0] });

  const items = useMemo(
    () => [
      {
        comp: 'tinymce',
        key: 'content',
        label: 'Content',
        fill: true,
      },
    ],
    [],
  );

  function selectFile(record) {
    if (record.id === selectedId) return;
    setSelectedId(record.id);
    setValues({ ...record });
  }

  const refresh = useCallback(
    ({ values: v }) => {
      setValues((prev) => ({ ...prev, ...v }));
      // keep the edited content so switching files preserves changes
      const record = records.find((r) => r.id === selectedId);
      if (record) record.content = v.content;
    },
    [records, selectedId],
  );

  const prevent = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div className="wx-aadD5Zv1 message">
        {selected ? `${selected.name} - ${values.content.length} chars` : null}
      </div>

      <div className="wx-aadD5Zv1 files" onClick={prevent}>
        {records.map((record) => (
          <button
            key={record.id}
            className={
              'wx-aadD5Zv1 demo-file' +
              (record.id === selectedId ? ' active' : '')
            }
            onClick={() => selectFile(record)}
          >
            {record.name}
          </button>
        ))}
      </div>

      {selectedId ? (
        <Editor
          placement="sidebar"
          autoSave={false}
          items={items}
          values={values}
          onAction={() => setSelectedId(0)}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
