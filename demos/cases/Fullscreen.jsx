import { useState, useMemo, useCallback } from 'react';
import { getData } from '../data';
import { Editor, registerEditorItem } from '../../src';

import { Comments } from '@svar-ui/react-comments';
import {
  Combo,
  ColorPicker,
  DatePicker,
  Slider,
  Button,
  MultiCombo,
} from '@svar-ui/react-core';
import './Fullscreen.css';

registerEditorItem('combo', Combo);
registerEditorItem('color', ColorPicker);
registerEditorItem('date', DatePicker);
registerEditorItem('slider', Slider);
registerEditorItem('multiselect', MultiCombo);

registerEditorItem('comments', Comments);
registerEditorItem('comments', Comments, { readonly: true });

export default function Fullscreen() {
  const { listItems, listData, users } = useMemo(() => getData(), []);

  const items = useMemo(
    () => [
      {
        comp: 'comments',
        key: 'comments',
        label: 'Comments',
        users,
        activeUser: 1,
        column: 'left',
      },
      ...listItems,
    ],
    [listItems, users],
  );
  const values = listData[0];

  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setVisible(false);
  }, []);

  const [placement, setPlacement] = useState('fullscreen');
  const [layout, setLayout] = useState('columns');
  const [autoSave, setAutoSave] = useState(false);
  const [readonly, setReadonly] = useState(false);

  return (
    <>
      <div className="wx-JodhWOx8 message">{message}</div>

      <div className="wx-JodhWOx8 toolbar">
        <div className="wx-JodhWOx8 item">
          <Button
            type="primary"
            text="Open editor: Manual save"
            onClick={() => {
              setPlacement('fullscreen');
              setLayout('columns');
              setAutoSave(false);
              setReadonly(false);

              setVisible(true);
            }}
          />
        </div>
        <div className="wx-JodhWOx8 item">
          <Button
            type=""
            text="Open editor: Auto-save"
            onClick={() => {
              setPlacement('fullscreen');
              setLayout('columns');
              setAutoSave(true);
              setReadonly(false);

              setVisible(true);
            }}
          />
        </div>
        <div className="wx-JodhWOx8 item">
          <Button
            type=""
            text="Open editor: Readonly"
            onClick={() => {
              setPlacement('fullscreen');
              setLayout('columns');
              setReadonly(true);

              setVisible(true);
            }}
          />
        </div>
      </div>

      {visible ? (
        <Editor
          autoSave={autoSave}
          placement={placement}
          layout={layout}
          readonly={readonly}
          items={items}
          values={values}
          onAction={handleClick}
        />
      ) : null}
    </>
  );
}
