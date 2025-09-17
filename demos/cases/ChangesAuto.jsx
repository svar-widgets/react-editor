import { useMemo, useState } from 'react';
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
import './ChangesAuto.css';

registerEditorItem('combo', Combo);
registerEditorItem('color', ColorPicker);
registerEditorItem('date', DatePicker);
registerEditorItem('slider', Slider);
registerEditorItem('multiselect', MultiCombo);

export default function ChangesAuto() {
  const initialData = useMemo(() => getData(), []);
  const [listItems] = useState(initialData.listItems);
  const [listData, setListData] = useState(initialData.listData);

  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(initialData.listData[0]);

  function handleClick({ item }) {
    setMessage('click: ' + item.id);
    setSelected(null);
  }

  const refresh = ({ values }) => {
    setMessage('update');

    setListData((prev) => {
      const ind = prev.findIndex((d) => d.id === values.id);
      const copy = prev.slice();
      copy[ind] = values;
      return copy;
    });
  };

  return (
    <>
      <div className="wx-unMwjHT5 message">{message}</div>

      <div className="wx-unMwjHT5 list">
        {listData.map((data) => (
          <div
            key={data.id}
            className={`wx-unMwjHT5 item ${selected?.id === data.id ? 'active' : ''}`}
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
          autoSave={true}
          items={listItems}
          values={selected}
          placement="sidebar"
          onAction={handleClick}
          onSave={refresh}
        />
      ) : null}
    </>
  );
}
