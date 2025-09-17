import { useState, useMemo, useCallback } from 'react';
import { getData } from '../data';
import { Editor } from '/src';
import { Button } from '@svar-ui/react-core';
import './ModalColumns.css';

export default function ModalColumns() {
  const { items, values } = useMemo(() => getData(), []);

  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true);

  const handleClick = useCallback(({ item }) => {
    setMessage('click: ' + item.id);
    setVisible(false);
  }, []);

  const [placement, setPlacement] = useState('modal');
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
              setPlacement('modal');
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
              setPlacement('modal');
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
              setPlacement('modal');
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
