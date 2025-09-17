import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import './Comments.css';
import { getData } from '../data';
import { Editor, registerEditorItem } from '../../src';

import { Comments as CommentsItem } from '@svar-ui/react-comments';
registerEditorItem('comments', CommentsItem);

export default function Comments() {
  const initial = useMemo(() => getData(), []);
  const [listData, setListData] = useState(initial.listData);

  const demoItems = useMemo(
    () => [
      initial.listItems[0],
      {
        comp: 'comments',
        key: 'comments',
        label: 'Comments',
        users: initial.users,
        activeUser: 1,
      },
    ],
    [initial],
  );

  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(listData[0]);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setSelected(null);
  }, []);

  const refresh = useCallback(({ values }) => {
    setMessage('update');
    setListData((prev) => {
      const ind = prev.findIndex((d) => d.id === values.id);
      const next = [...prev];
      next[ind] = values;
      return next;
    });
  }, []);

  const listDataRef = useRef(listData);
  useEffect(() => {
    listDataRef.current = listData;
  }, [listData]);

  const select = useCallback((id) => {
    setTimeout(() => {
      const current = listDataRef.current;
      const found = current.find((d) => d.id === id);
      setSelected(found);
    }, 100);
  }, []);

  return (
    <>
      <div className="wx-LBs0Hy8m message">{message}</div>

      <div className="wx-LBs0Hy8m list">
        {listData.map((data, idx) => (
          <div
            key={idx}
            className={
              'wx-LBs0Hy8m ' +
              `item ${selected?.id === data.id ? 'active' : ''}`
            }
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
          focus={true}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
