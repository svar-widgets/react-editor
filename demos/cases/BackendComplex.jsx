import { useEffect, useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '/src';
import { RestURL } from '@svar-ui/lib-data-provider';

import { Tasklist } from '@svar-ui/react-tasklist';
import { Comments } from '@svar-ui/react-comments';

import './BackendComplex.css';

export default function BackendComplex() {
  useEffect(() => {
    registerEditorItem('tasks', Tasklist);
    registerEditorItem('comments', Comments);
  }, []);

  const commentsURL = useMemo(
    () =>
      new RestURL('https://master--svar-comments-go--dev.webix.io/comments'),
    [],
  );
  const tasksURL = useMemo(
    () => new RestURL('https://master--svar-tasklist-go--dev.webix.io/tasks'),
    [],
  );

  const initialData = useMemo(() => getData(), []);
  const [listData] = useState(initialData.listData);
  const [users] = useState(initialData.users);

  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(null);

  function handleClick({ item }) {
    setMessage('click: ' + item.id);
    setSelected(null);
  }

  const config = useMemo(
    () => ({
      placement: 'modal',
      layout: 'columns',
      autoSave: true,
      items: [
        { comp: 'text', key: 'label', label: 'Name', column: 'left' },
        {
          comp: 'tasks',
          key: 'id',
          label: 'Tasks',
          onData: (v) => tasksURL.path(v).get(),
          onChange: ({ action, task, id, originalValue: v }) =>
            tasksURL.path(v).save(action, task, id),
        },
        {
          comp: 'comments',
          key: 'id',
          label: 'Comments',
          users,
          activeUser: 1,
          column: 'left',
          onData: (v) => commentsURL.path(v).get(),
          onChange: ({ action, comment, id, originalValue: v }) =>
            commentsURL.path(v).save(action, comment, id),
        },
      ],
    }),
    [],
  );

  return (
    <>
      <div className="wx-f9E2TjM8 message">{message}</div>

      <div className="wx-f9E2TjM8 list">
        {listData.map((data, i) => (
          <div
            key={i}
            className={`wx-f9E2TjM8 item ${selected?.id === data.id ? 'active' : ''}`}
            onClick={() => setSelected(data)}
          >
            <h4>{data.label}</h4>
            <p>{data.description || ''}</p>
          </div>
        ))}
      </div>

      {selected ? (
        <Editor {...config} values={selected} onAction={handleClick} />
      ) : null}
    </>
  );
}
