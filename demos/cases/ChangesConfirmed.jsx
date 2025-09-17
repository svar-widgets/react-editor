import { useEffect, useMemo, useState, useCallback } from 'react';
import { getData } from '../data';
import { Editor } from '/src';
import { registerEditorItem } from '/src';
import {
  Combo,
  ColorPicker,
  DatePicker,
  Slider,
  MultiCombo,
} from '@svar-ui/react-core';
import './ChangesConfirmed.css';

export default function ChangesConfirmed() {
  const initData = useMemo(() => getData(), []);
  const [listItems] = useState(initData.listItems);
  const [listData, setListData] = useState(initData.listData);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(initData.listData[0]);

  useEffect(() => {
    registerEditorItem('combo', Combo);
    registerEditorItem('color', ColorPicker);
    registerEditorItem('date', DatePicker);
    registerEditorItem('slider', Slider);
    registerEditorItem('multiselect', MultiCombo);
  }, []);

  function handleClick({ item }) {
    setMessage('click: ' + item.id);
    setSelected(null);
  }

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

  return (
    <>
      <div className="wx-SNwIo1tm message">{message}</div>

      <div className="wx-SNwIo1tm list">
        {listData.map((data, idx) => (
          <div
            key={idx}
            className={`wx-SNwIo1tm item${selected?.id === data.id ? ' active' : ''}`}
            onClick={() => setSelected(data)}
          >
            <h4>{data.label}</h4>
            <p>{data.description || ''}</p>
            <sub>starts on: {data.start_date?.toLocaleDateString() || ''}</sub>
          </div>
        ))}
      </div>

      {selected ? (
        <Editor
          placement="sidebar"
          autoSave={false}
          items={listItems}
          values={selected}
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
