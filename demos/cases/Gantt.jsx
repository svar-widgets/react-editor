import { useState } from 'react';
import { Editor, registerEditorItem } from '../../src';
import { Counter } from '@svar-ui/react-core';
import Links from '../custom/gantt/Links.jsx';
import './Gantt.css';

registerEditorItem('counter', Counter);
registerEditorItem('link', Links);

export default function Gantt() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      start: new Date(2024, 3, 2),
      end: new Date(2024, 3, 17),
      text: 'Project planning',
      progress: 30,
      parent: 0,
      type: 'project',
      duration: 15,
      details: '',
    },
    {
      id: 10,
      start: new Date(2024, 3, 2),
      end: new Date(2024, 3, 5),
      text: 'Marketing analysis',
      progress: 100,
      parent: 1,
      type: 'task',
      duration: 4,
      details: '',
    },
    {
      id: 11,
      start: new Date(2024, 3, 5),
      end: new Date(2024, 3, 7),
      text: 'Discussions',
      progress: 100,
      parent: 1,
      type: 'task',
      duration: 2,
      details: '',
    },
    {
      id: 12,
      start: new Date(2024, 3, 8),
      text: 'Approval of strategy',
      progress: 100,
      parent: 1,
      type: 'milestone',
    },
  ]);

  const links = [
    {
      id: 1,
      source: 10,
      target: 11,
      type: 'e2s',
    },
    {
      id: 2,
      source: 11,
      target: 12,
      type: 'e2s',
    },
  ];

  const listItems = [
    {
      key: 'text',
      comp: 'text',
      label: 'Name',
      config: {
        placeholder: 'Add task name',
      },
    },
    {
      comp: 'textarea',
      key: 'details',
      label: 'Description',
      config: {
        placeholder: 'Add description',
      },
    },
    {
      comp: 'combo',
      key: 'type',
      label: 'Type',
      options: [
        { id: 'task', label: 'Task' },
        { id: 'project', label: 'Project' },
        { id: 'milestone', label: 'Milestone' },
      ],
    },
    {
      comp: 'date',
      key: 'start',
      label: 'Start date',
    },
    {
      comp: 'date',
      key: 'end',
      label: 'End date',
    },
    {
      comp: 'counter',
      key: 'duration',
      label: 'Duration',
      config: { min: 1, max: 100 },
    },
    {
      comp: 'slider',
      key: 'progress',
      labelTemplate: (value) => `Progress ${value}%`,
    },
    {
      comp: 'link',
      key: 'link',
      label: '',
    },
  ];

  function getTask(id) {
    return tasks.find((t) => t.id === id);
  }

  function getLinks(id) {
    const inLinks = links
      .filter((a) => a.target == id)
      .map((link) => ({ link, task: getTask(link.source) }));

    const outLinks = links
      .filter((a) => a.source == id)
      .map((link) => ({ link, task: getTask(link.target) }));

    return [
      { title: 'Predecessors', data: inLinks },
      { title: 'Successors', data: outLinks },
    ];
  }

  const [activeTask, setActiveTask] = useState(null);

  function handleClick({ item, values }) {
    const actionId = item.id;
    const id = values.id;
    if (actionId === 'delete') {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
    setActiveTask(null);
  }

  function selectActive(data) {
    const link = getLinks(data.id);

    setActiveTask({
      ...data,
      link,
    });
  }

  const refresh = ({ values }) => {
    setTasks((prev) => {
      const next = [...prev];
      const ind = next.findIndex((d) => d.id === values.id);
      if (ind !== -1) next[ind] = values;
      return next;
    });
  };

  return (
    <>
      <h4 style={{ marginLeft: 20 }}>Imitation of gantt project progress</h4>

      <div className="wx-VmEtBFHJ tasks">
        {tasks.map((data) => (
          <div
            key={data.id}
            className={`wx-VmEtBFHJ item ${activeTask?.id === data.id ? 'active' : ''}`}
            onClick={() => selectActive(data)}
          >
            <div className="wx-VmEtBFHJ content">{data.text}</div>
          </div>
        ))}
      </div>

      {activeTask ? (
        <Editor
          topBar={{
            items: [
              {
                comp: 'icon',
                icon: 'wxi-close',
                id: 'close',
              },
              { comp: 'spacer' },
              {
                comp: 'button',
                type: 'danger',
                text: 'Delete',
                id: 'delete',
              },
              {
                type: 'primary',
                comp: 'button',
                text: 'Save',
                id: 'save',
              },
            ],
          }}
          placement="sidebar"
          autoSave={true}
          items={listItems}
          values={activeTask}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
