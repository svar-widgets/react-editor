import { useState, useMemo, useCallback } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '../../src';
import {
  Switch,
  Combo,
  ColorPicker,
  DatePicker,
  Slider,
  MultiCombo,
} from '@svar-ui/react-core';
import './ToolbarValues.css';

registerEditorItem('combo', Combo);
registerEditorItem('color', ColorPicker);
registerEditorItem('date', DatePicker);
registerEditorItem('slider', Slider);
registerEditorItem('multiselect', MultiCombo);

export default function ToolbarValues() {
  const initialData = useMemo(() => getData(), []);
  const [listItems] = useState(initialData.listItems);
  const [listData, setListData] = useState(initialData.listData);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(initialData.listData[0]);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setSelected(null);
  }, []);

  const refresh = useCallback(({ values }) => {
    setMessage('update');

    setListData((prev) => {
      const ind = prev.findIndex((d) => d.id === values.id);
      if (ind === -1) return prev;
      const next = prev.slice();
      next[ind] = values;
      return next;
    });
  }, []);

  const select = useCallback(
    (id) => {
      setTimeout(() => {
        const found = listData.find((d) => d.id === id);
        setSelected(found);
      }, 100);
    },
    [listData],
  );

  return (
    <>
      <div className="wx-SeGpqTpn message">{message}</div>

      <div className="wx-SeGpqTpn list">
        {listData.map((data) => (
          <div
            key={data.id}
            className={`wx-SeGpqTpn item ${selected?.id === data.id ? 'active' : ''}`}
            onClick={() => select(data.id)}
          >
            <h4>{data.label}</h4>
            <p>{data.description || ''}</p>
            {data.state ? <div>State: {data.state}</div> : null}
          </div>
        ))}
      </div>

      {selected ? (
        <Editor
          placement="sidebar"
          topBar={{
            items: [
              { comp: 'label', spacer: true, key: 'label' },
              { comp: Switch, key: 'state' },
            ],
          }}
          autoSave={true}
          items={listItems}
          values={selected}
          focus={true}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
