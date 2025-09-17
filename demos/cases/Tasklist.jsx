import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '../../src';

import { Tasklist as WxTasklist } from '@svar-ui/react-tasklist';
registerEditorItem('tasks', WxTasklist);

import './Tasklist.css';

function Tasklist() {
  const initial = useMemo(() => getData(), []);
  const [listData, setListData] = useState(initial.listData);

  const demoItems = useMemo(
    () => [
      {
        comp: 'tasks',
        key: 'task',
        label: 'Task',
      },
    ],
    [initial],
  );

  const [message, setMessage] = useState('');

  const [selected, setSelected] = useState(initial.listData[0]);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setSelected(null);
  }, []);

  const refresh = useCallback(({ values }) => {
    setMessage('update');

    setListData((prev) => {
      const arr = [...prev];
      const ind = arr.findIndex((d) => d.id === values.id);
      arr[ind] = values;
      return arr;
    });
  }, []);

  const listDataRef = useRef(listData);
  useEffect(() => {
    listDataRef.current = listData;
  }, [listData]);

  const select = useCallback((id) => {
    setTimeout(() => {
      const found = listDataRef.current.find((d) => d.id === id);
      setSelected(found);
    }, 100);
  }, []);

  return (
    <>
      <div className="wx-1KiwXQ8y message">{message}</div>

      <div className="wx-1KiwXQ8y list">
        {listData.map((data, idx) => (
          <div
            key={idx}
            className={`wx-1KiwXQ8y item${selected?.id === data.id ? ' active' : ''}`}
            onClick={() => select(data.id)}
          >
            <h4>{data.label}</h4>
            <p>{data.description || ''}</p>
            <sub>starts on: {data.start_date.toLocaleDateString()}</sub>
          </div>
        ))}
      </div>

      {selected ? (
        <Editor
          placement="sidebar"
          autoSave={true}
          items={demoItems}
          values={selected}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}

export default Tasklist;
