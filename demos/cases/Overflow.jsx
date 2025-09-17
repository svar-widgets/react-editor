import { useEffect, useMemo, useState } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '/src';
import { Button } from '@svar-ui/react-core';
import { Tasklist } from '@svar-ui/react-tasklist';
import { Comments } from '@svar-ui/react-comments';
import './Overflow.css';

const Overflow = () => {
  useEffect(() => {
    registerEditorItem('tasks', Tasklist);
    registerEditorItem('comments', Comments);
  }, []);

  const { listData, users } = useMemo(() => getData(), []);

  const bottomBar = useMemo(
    () => ({
      items: [
        { comp: 'spacer' },
        {
          comp: 'button',
          type: 'primary',
          text: 'Save',
          id: 'save',
        },
        { comp: 'button', text: 'Cancel', id: 'cancel' },
      ],
    }),
    [],
  );

  const config1 = useMemo(
    () => ({
      placement: 'modal',
      layout: 'columns',
      autoSave: false,
      items: [
        { comp: 'text', key: 'label', label: 'Name', column: 'left' },
        { comp: 'tasks', key: 'task', label: 'Tasks' },
        {
          comp: 'comments',
          key: 'comments',
          label: 'Comments',
          users,
          activeUser: 1,
          column: 'left',
        },
      ],
    }),
    [users],
  );

  const config2 = useMemo(
    () => ({
      ...config1,
      bottomBar,
    }),
    [config1, bottomBar],
  );

  const config3 = useMemo(
    () => ({
      placement: 'sidebar',
      autoSave: true,
      items: [
        { comp: 'text', key: 'label', label: 'Name' },
        { comp: 'tasks', key: 'task', label: 'Tasks' },
        {
          comp: 'comments',
          key: 'comments',
          label: 'Comments',
          users,
          activeUser: 1,
        },
      ],
    }),
    [users],
  );

  const config4 = useMemo(
    () => ({
      ...config3,
      bottomBar,
    }),
    [config3, bottomBar],
  );

  const config5 = useMemo(
    () => ({
      placement: 'modal',
      autoSave: true,
      items: [
        { comp: 'text', key: 'label', label: 'Name' },
        { comp: 'tasks', key: 'task', label: 'Tasks' },
        {
          comp: 'comments',
          key: 'comments',
          label: 'Comments',
          users,
          activeUser: 1,
        },
      ],
    }),
    [users],
  );

  const config6 = useMemo(
    () => ({
      ...config5,
      bottomBar,
    }),
    [config5, bottomBar],
  );

  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(config1);

  return (
    <>
      <div className="wx-w6KOZyis toolbar">
        <div className="wx-w6KOZyis item">
          <Button
            type="primary"
            text="Open Modal with 2 columns with top bar"
            onClick={() => {
              setConfig(config1);
              setVisible(true);
            }}
          />
        </div>
        <div className="wx-w6KOZyis item">
          <Button
            text="Open Modal with columns with bottom bar"
            onClick={() => {
              setConfig(config2);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-w6KOZyis item">
          <Button
            text="Open Sidebar with scroll and top bar"
            onClick={() => {
              setConfig(config3);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-w6KOZyis item">
          <Button
            text="Open Sidebar with scroll and bottom bar"
            onClick={() => {
              setConfig(config4);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-w6KOZyis item">
          <Button
            text="Open Modal with scroll and top bar"
            onClick={() => {
              setConfig(config5);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-w6KOZyis item">
          <Button
            text="Open Modal with scroll and bottom bar"
            onClick={() => {
              setConfig(config6);
              setVisible(true);
            }}
          />
        </div>
      </div>

      <h4 style={{ margin: '20px' }}>Inline Editor example</h4>
      <div className="wx-w6KOZyis editor">
        <Editor items={config1.items} values={listData[0]} topBar={false} />
      </div>

      {visible ? (
        <Editor
          {...config}
          values={listData[0]}
          onAction={() => setVisible(false)}
        />
      ) : null}
    </>
  );
};

export default Overflow;
