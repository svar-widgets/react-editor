import { useState } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '/src';
import { Button } from '@svar-ui/react-core';
import { Tasklist } from '@svar-ui/react-tasklist';
import { Comments } from '@svar-ui/react-comments';
import './Layouts.css';

registerEditorItem('tasks', Tasklist);
registerEditorItem('comments', Comments);

const { listData, users } = getData();

const config1 = {
  placement: 'modal',
  layout: 'columns',
  autoSave: false,
  items: [
    { comp: 'text', key: 'name', label: 'Name', column: 'left' },
    { comp: "checkbox", key: "admin", label: "Is Admin" },
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
};

const config2 = {
  placement: 'modal',
  layout: 'columns',
  autoSave: false,
  items: [
    { comp: 'text', key: 'name', label: 'Name', column: 'left' },
    { comp: "checkbox", key: "admin", label: "Is Admin" },
    { comp: 'tasks', key: 'task', label: 'Tasks', column: 'left' },
    {
      comp: 'comments',
      key: 'comments',
      label: 'Comments',
      users,
      activeUser: 1,
    },
  ],
};

const config3 = {
  placement: 'sidebar',
  autoSave: true,
  items: [
    { comp: 'text', key: 'name', label: 'Name' },
    { comp: "checkbox", key: "admin", label: "Is Admin" },
    { comp: 'tasks', key: 'task', label: 'Tasks' },
    {
      comp: 'comments',
      key: 'comments',
      label: 'Comments',
      users,
      activeUser: 1,
    },
  ],
};

const config4 = {
  placement: 'modal',
  autoSave: true,
  items: [
    { comp: 'text', key: 'name', label: 'Name' },
    { comp: "checkbox", key: "admin", label: "Is Admin" },
    { comp: 'tasks', key: 'task', label: 'Tasks' },
    {
      comp: 'comments',
      key: 'comments',
      label: 'Comments',
      users,
      activeUser: 1,
    },
  ],
};

export default function Layouts() {
  const [visible, setVisible] = useState(true);
  const [config, setConfig] = useState(config1);

  return (
    <>
      <div className="wx-8HjOf4HF toolbar">
        <div className="wx-8HjOf4HF item">
          <Button
            type="primary"
            text="Open: Comments | Tasks"
            onClick={() => {
              setConfig(config1);
              setVisible(true);
            }}
          />
        </div>
        <div className="wx-8HjOf4HF item">
          <Button
            text="Open: Tasks | Comments"
            onClick={() => {
              setConfig(config2);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-8HjOf4HF item">
          <Button
            text="Open: Sidebar with scroll"
            onClick={() => {
              setConfig(config3);
              setVisible(true);
            }}
          />
        </div>

        <div className="wx-8HjOf4HF item">
          <Button
            text="Open: Modal with scroll"
            onClick={() => {
              setConfig(config4);
              setVisible(true);
            }}
          />
        </div>
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
}
