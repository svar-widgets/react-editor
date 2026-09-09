import { useCallback, useMemo, useRef, useState } from 'react';
import { Editor, registerEditorItem, CodeMirror } from '../../src';
import './CodeMirror.css';

registerEditorItem('code-mirror', CodeMirror);
registerEditorItem('code-mirror', CodeMirror, { readonly: true });

const initialRecords = [
  {
    id: 1,
    name: 'app.js',
    language: 'javascript',
    content: `import { createStore } from "./store.js";

const store = createStore({ todos: [], filter: "all" });

export function addTodo(text) {
    const todo = { id: Date.now(), text, done: false };
    store.update(state => ({ ...state, todos: [...state.todos, todo] }));
    return todo;
}

export function toggleTodo(id) {
    store.update(state => ({
        ...state,
        todos: state.todos.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        ),
    }));
}

export function visibleTodos(state) {
    switch (state.filter) {
        case "active":
            return state.todos.filter(t => !t.done);
        case "done":
            return state.todos.filter(t => t.done);
        default:
            return state.todos;
    }
}`,
  },
  {
    id: 2,
    name: 'spec.md',
    language: 'markdown',
    content: `# Todo App Specification

A minimal task manager used as the reference demo for the code editor.

## Goals

- Add, toggle and remove tasks
- Persist tasks between sessions
- Filter by **all**, **active** or **done**

## Data model

| Field  | Type      | Description                |
| ------ | --------- | -------------------------- |
| id     | \`number\`  | Unique identifier          |
| text   | \`string\`  | Human readable description |
| done   | \`boolean\` | Completion flag            |

## Open questions

1. Should completed tasks auto-archive after 30 days?
2. Do we need multi-user support in v1?

> Note: keep the public API surface as small as possible.`,
  },
  {
    id: 3,
    name: 'theme.css',
    language: 'css',
    content: `:root {
    --color-bg: #ffffff;
    --color-surface: #f5f6f8;
    --color-text: #2a2a2a;
    --color-accent: #2196f3;
    --radius: 6px;
    --spacing: 8px;
}

.todo {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: calc(var(--spacing) * 1.5);
    background: var(--color-surface);
    border-radius: var(--radius);
    color: var(--color-text);
}

.todo--done {
    opacity: 0.5;
    text-decoration: line-through;
}

.todo button {
    margin-left: auto;
    border: none;
    border-radius: var(--radius);
    background: var(--color-accent);
    color: #fff;
    cursor: pointer;
}`,
  },
];

export default function CodeMirrorDemo() {
  // records are mutated in place so switching files preserves edits
  const records = useRef(initialRecords.map((r) => ({ ...r }))).current;

  const [selectedId, setSelectedId] = useState(records[0].id);
  const selected = records.find((r) => r.id === selectedId);

  const [values, setValues] = useState({ ...records[0] });

  const items = useMemo(
    () => [
      {
        comp: 'code-mirror',
        key: 'content',
        label: '',
        fill: true,
        language: selected ? selected.language : 'javascript',
      },
    ],
    [selected],
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
      <div className="wx-aac2hlHQ message">
        {selected ? `${selected.name} - ${values.content.length} chars` : null}
      </div>

      <div className="wx-aac2hlHQ files" onClick={prevent}>
        {records.map((record) => (
          <button
            key={record.id}
            className={
              'wx-aac2hlHQ demo-file' +
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
